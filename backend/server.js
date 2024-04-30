const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());
app.use(express.json())

const port = 3001

const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'atlas-shoes',
	password: '',
})

con.connect(err => {
  if (err) {
      console.log(err)
  }
  else {
      console.log('DB is connected')
  }
})

app.get('/catalog', (req, res) => {
  let category = req.query.category
  let color = req.query.color
  let price = req.query.price
  let size = req.query.sizes
  let search = req.query.search

  let query = `
  SELECT 
    i.*,
    c.colors,
    c.colorsHex,
    s.sizes
  FROM 
    items i
  LEFT JOIN
    (SELECT ic.itemId, GROUP_CONCAT(c.colorName SEPARATOR ' ') AS colors, GROUP_CONCAT(c.colorCode SEPARATOR ' ') AS colorsHex
      FROM item_colors ic
    LEFT JOIN colors c ON ic.colorId = c.colorId
    GROUP BY ic.itemId) c ON i.itemId = c.itemId
  LEFT JOIN
      (SELECT isz.itemId, GROUP_CONCAT(s.size SEPARATOR ' ') AS sizes
      FROM item_sizes isz
      LEFT JOIN sizes s ON isz.sizeId = s.sizeId
      GROUP BY isz.itemId) s ON i.itemId = s.itemId
  WHERE i.itemId IS NOT NULL`
  
  if (category) {
    query += ` AND i.itemCategory IN ('${category.join(`', '`)}')`
  }

  if (search) {
    query += ` AND i.itemName = '${search}'`
  }

  if (color) {
    query += ` AND (c.colors LIKE '%${color.join(`%' OR c.colors LIKE '%`)}%')`
  }

  if (size) {
    query += ` AND (s.sizes LIKE '%${size.join(`%' OR s.sizes LIKE '%`)}%')`
  }

  if (price) {
      if (price[0] && price[1]) {
        query += ` AND itemPrice BETWEEN ${price[0]} AND ${price[1]}`
      }
      else if (price[0]) {
        query += ` AND itemPrice > ${price[0]}`
      }
      else if (price[1]) {
        query += ` AND itemPrice < ${price[1]}`
      }
  }


  con.query(query, (err, results) => {
    if (err) {
      console.log(err)
    }
    console.log(req.query)
    console.log(query)
    res.json(results)
  })
})

app.get('/item/:id', (req, res) => {
  const itemId = req.params.id
  const query = `SELECT 
  i.*,
  c.colors,
  c.colorsHex,
  s.sizes
FROM 
  items i
LEFT JOIN
  (SELECT ic.itemId, GROUP_CONCAT(c.colorName SEPARATOR ' ') AS colors, GROUP_CONCAT(c.colorCode SEPARATOR ' ') AS colorsHex
    FROM item_colors ic
  LEFT JOIN colors c ON ic.colorId = c.colorId
  GROUP BY ic.itemId) c ON i.itemId = c.itemId
LEFT JOIN
    (SELECT isz.itemId, GROUP_CONCAT(s.size SEPARATOR ' ') AS sizes
    FROM item_sizes isz
    LEFT JOIN sizes s ON isz.sizeId = s.sizeId
    GROUP BY isz.itemId) s ON i.itemId = s.itemId
  WHERE i.itemId = ${itemId}`

  con.query(query, (err, results) => {
    if (err) {
      console.log(err)
    }
    console.log(query)
    console.log(results)
    res.json(results)
  })
})

app.post('/sing-up', (req, res) => {
  const { userName, userLogin, password } = req.body
  bcrypt.genSalt(10, (err, salt) => { //Генерируем хэшированный пароль
    bcrypt.hash(password, salt, (err, hashedPassword) => { // Присваиваем паролю это значение
      if (err) {
        console.log(err)
      }
  
      const query = `INSERT INTO users(userName, userLogin, hashedPassword, role) VALUES (?, ?, ?, 'user')`
      const values = [userName, userLogin, hashedPassword]
  
      con.query(query, values, (err, results) => {
        if (err) {
          console.log(err)
        }
  
        console.log('Registration completed')

        const userId = results.insertId
        const token = jwt.sign(
          {
            userId: userId,
            userName: userName,
            userLogin: userLogin,
            role: 'user'
          },
          'secretKey',
          { expiresIn: '48h' }
        )

        res.status(200).json({ token })
      })
    })
  })
})

app.post('/sing-in', (req, res) => {
  const { userLogin, password } = req.body
  const query = `SELECT * FROM users WHERE userLogin = ?`

  con.query(query, [userLogin], (err, results) => { //Проверяем логин чтобы приступить к проверке пароля
    if (err) {
      console.log(err)
      return res.status(500).send('Ошибка сервера')
    }
    if (results.length === 0) {
      return res.status(400).send('Неправильные данные')
    }
    const user = results[0]
    bcrypt.compare(password, user.hashedPassword, (err, result) => { //Проверяем пароль
      if (err) {
        console.log(err)
        return res.status(500).send('Ошибка сервера')
      }
      if (result) {
        console.log('Auth is completed')

        const token = jwt.sign( //Создаём jwt токен
          {
            userId: user.userId,
            userName: user.userName,
            userLogin: user.userLogin,
            role: user.role
          },
          'secretKey',
          { expiresIn: '48h' }
        )

        res.status(200).json({ token })
      }
      else {
        return res.status(400).send('Неправильные данные')
      }
    })
  })
})

app.get('/user-profile', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).send('Токен не найден')
  }
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send('Недействительный токен')
    }

    const { userId } = decoded

    const query = `SELECT userName, userLogin, role, userEmail FROM users WHERE userId = ?`

    con.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err)
      }

      console.log(results)
      res.send(results)
    })

    // const {userName, userLogin, role } = decoded
    // res.status(200).json({ userId, userName, userLogin, role })
  })
})

app.put('/edit-general', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  if (!token) {
    return res.status(401).send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send('Токен недействителен')
    }

    const { userId, userName, userLogin, userEmail } = decoded

    const { newUserName, newUserLogin, newUserEmail } = req.body

    let query = `UPDATE users SET `
    const updateValues = []

    if (newUserName) {
      query += `userName = ?, `
      updateValues.push(newUserName)
    }

    if (newUserLogin) {
      query += `userLogin = ?, `
      updateValues.push(newUserLogin)
    }

    if (newUserEmail) {
      query += `userEmail = ?, `
      updateValues.push(newUserEmail)
    }

    query = query.slice(0, -2)

    query += ` WHERE userId = ?`
    updateValues.push(userId)

    con.query(query, updateValues, (err, results) => {
      if (err) {
        console.log(err)
        return res.send('Ошибка сервера')
      }

      console.log('Updated')
      res.status(200).send('Updated')
    })
  })
})

app.put('/change-password', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.send('Токен недействителен')
    }

    const { userId } = decoded
    const { oldPassword, newPassword } = req.body

    const getPasswordQuery = `SELECT hashedPassword FROM users WHERE userId = ?`

    con.query(getPasswordQuery, [userId], (err, results) => {
      if (err) {
        console.log(err)
        return res.send('Ошибка сервера')
      }

      if (results.length === 0) {
        return res.send('Пользователь не найден')
      }

      const userHashedPassword = results[0].hashedPassword

      bcrypt.compare(oldPassword, userHashedPassword, (err, result) => {
        if (err) {
          console.log(err)
          return res.send('Ошибка сервера')
        }

        if (!result) {
          return res.send('Старый пароль неверен') //Вывести ошибку на frontend
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hashedPassword) => {
            if (err) {
              console.log(err)
              return res.send('Ошибка сервера')
            }

            const updatePasswordQuery = `UPDATE users SET hashedPassword = ? WHERE userId = ?`

            con.query(updatePasswordQuery, [hashedPassword, userId], (err, results) => {
              if (err) {
                console.log(err)
                return res.send('Ошибка сервера')
              }

              console.log('Пароль был изменён')
              res.status(200).send('Пароль был изменён')
            })
          })
        })
      })
    })
  })
})

app.post('/add-to-wishlist', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.send('Токен недействителен')
    }

    const { userId } = decoded
    const { itemId } = req.body

    const getWishsQuery = `SELECT * FROM wishlist WHERE userId = ? AND itemId = ?`

    con.query(getWishsQuery, [userId, itemId], (err, results) => {
      if (results.length === 0) {
        const addingQuery = `INSERT INTO wishlist (userId, itemId) VALUES (?, ?)`

        con.query(addingQuery, [userId, itemId], (err, results) => {
          if (err) {
            console.log(err)
          }

          console.log('Товар добавлен в список избранного')
        })
      }
      else if (results.length === 1) {
        const deletingQuery = `DELETE FROM wishlist WHERE userId = ? AND itemId = ?`

        con.query(deletingQuery, [userId, itemId], (err, results) => {
          if (err) {
            console.log(err)
          }

          console.log('Товар удалён из списка желаемого')
        })
      }
    })
  })
})

app.get('/show-wishlist', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.send('Токен недействителен')
    }

    const { userId } = decoded


    const query = `SELECT 
    i.*, 
    c.colors, 
    c.colorsHex, 
    s.sizes 
    FROM 
    wishlist w
    JOIN items i ON w.itemId = i.itemId
    LEFT JOIN 
    (SELECT ic.itemId, GROUP_CONCAT(c.colorName SEPARATOR ' ') AS colors, GROUP_CONCAT(c.colorCode SEPARATOR ' ') AS colorsHex
      FROM item_colors ic
      LEFT JOIN colors c ON ic.colorId = c.colorId
      GROUP BY ic.itemId) c ON i.itemId = c.itemId
    LEFT JOIN 
      (SELECT isz.itemId, GROUP_CONCAT(s.size SEPARATOR ' ') AS sizes
      FROM item_sizes isz
      LEFT JOIN sizes s ON isz.sizeId = s.sizeId
      GROUP BY isz.itemId) s ON i.itemId = s.itemId
    WHERE w.userId = ?`

    con.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err)
      }

      if (results.length > 0) {
        res.status(200).json(results)
      }
      else {
        return res.send('Ваш список желаемого пока пуст')
      }
    })
  })
})

app.post('/delete-from-wishlist', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.send('Токен недействителен')
    }

    const { userId } = decoded
    const { itemId } = req.body

    const deleteQuery = `DELETE FROM wishlist WHERE userId = ? AND itemId = ?`

    con.query(deleteQuery, [userId, itemId], (err, resulst) => {
      if (err) {
        console.log(err)
      }

      console.log('Товар удалён из избранного')

      const selectQuery = `SELECT * FROM wishlist WHERE userId = ?`

      con.query(selectQuery, [userId], (err, rows) => {
        if (err) {
          console.log(err)
          return res.status(500).send('Ошибка сервера')
        }
        console.log('Обновленный список избранного:', rows)
        res.send(rows)
      })
    })
  })
})

app.post('/add-to-cart', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
    }

    const { userId } = decoded
    const { itemId } = req.body

    const checkQuantityQuery = `SELECT * FROM cart WHERE userId = ? AND itemId = ?`

    con.query(checkQuantityQuery, [userId, itemId], (err, results) => {
      if (err) {
        console.log(err)
      }

      if (results.length === 0) {
        const query = `INSERT INTO cart (userId, itemId, quantity) VALUES (?, ?, 1)`

        con.query(query, [userId, itemId], (err, results) => {
          if (err) {
            console.log(err)
          }

        console.log('Добавлено в корзину')
        })
      }

      else {
        const query = `UPDATE cart SET quantity = quantity + 1 WHERE userId = ? AND itemId = ?`

        con.query(query, [userId, itemId], (err, results) => {
          if (err) {
            console.log(err)
          }

          console.log('Товар был прибавлен')
        })
      }
    })
  })
})

app.put('/increase-quantity', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
    }

    const { userId } = decoded
    const { itemId } = req.body

    const increaseQuery = `UPDATE cart SET quantity = quantity + 1 WHERE userId = ? AND itemId = ?`

    con.query(increaseQuery, [userId, itemId], (err, results) => {
      if (err) {
        console.log(err)
      }

      console.log('increase')
    })
  })
})

app.put('/decrease-quantity', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
    }

    const { userId } = decoded
    const { itemId } = req.body

    const query = `UPDATE cart SET quantity = quantity - 1 WHERE userId = ? AND itemId = ?`

    con.query(query, [userId, itemId], (err, results) => {
      if (err) {
        console.log(err)
      }

      console.log('decrease')
    })
  })
})

app.get('/get-cart', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]

  if (!token) {
    return res.send('Токен не найден')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
    }

    const { userId } = decoded

    const query = `SELECT 
    i.*, 
    c.colors, 
    c.colorsHex, 
    s.sizes,
    quantity
    FROM 
    cart cr
    JOIN items i ON cr.itemId = i.itemId
    LEFT JOIN 
    (SELECT ic.itemId, GROUP_CONCAT(c.colorName SEPARATOR ' ') AS colors, GROUP_CONCAT(c.colorCode SEPARATOR ' ') AS colorsHex
      FROM item_colors ic
      LEFT JOIN colors c ON ic.colorId = c.colorId
      GROUP BY ic.itemId) c ON i.itemId = c.itemId
    LEFT JOIN 
      (SELECT isz.itemId, GROUP_CONCAT(s.size SEPARATOR ' ') AS sizes
      FROM item_sizes isz
      LEFT JOIN sizes s ON isz.sizeId = s.sizeId
      GROUP BY isz.itemId) s ON i.itemId = s.itemId
    WHERE cr.userId = ?`

    con.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err)
      }

      if (results.length > 0) {
        res.status(200).json(results)
      }
      else {
        return res.send('Ваша корзина пуста')
      }
    })
  })
})

app.get('/is-admin', verifyToken, (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).send('Токен не найден')
  }
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send('Недействительный токен')
    }

    const { userId } = decoded

    const query = `SELECT role FROM users WHERE userId = ?`

    con.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err)
      }

      console.log(results)
      res.json(results)
    })
  })
})

app.put('/')

app.delete('/delete-item', (req, res) => {
  const itemId = req.body
  const deleteQueries = [
    `DELETE FROM item_colors WHERE itemId = ?`,
    `DELETE FROM item_sizes WHERE itemId = ?`,
    `DELETE FROM wishlist WHERE itemId = ?`,
    `DELETE FROM cart WHERE itemId = ?`,
    `DELETE FROM items WHERE itemId = ?`
  ];

  deleteQueries.forEach(query => {
    con.query(query, [itemId], (err, results) => {
      if (err) {
        con.rollback(() => {
          console.log(err)
          return res.status(500).send('Ошибка сервера')
        })
      }
    })
  })
})

app.get('/protected-route', verifyToken, (req, res) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).send('Токен не дан')
  }

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Ошибка сервера')
    }
    req.user = decoded
    res.send('Доступ к защищенному маршруту разрешен')
  })
});

function verifyToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).send('Токен не дан')
  }
  next()
}

app.listen(port, () => {
  console.log(`started at localhost:${port}`)
})