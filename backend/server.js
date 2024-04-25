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
      return res.send('Неправильные данные')
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
          { expiresIn: '6h' }
        )

        res.status(200).json({ token })
      }
      else {
        return res.send('Неправильные данные')
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

    const { userId, userName, userLogin, role } = decoded
    res.status(200).json({ userId, userName, userLogin, role })
  })
})

app.put('/edit-general', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
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
        return res.status(500).send('Ошибка сервера')
      }

      console.log('Updated')
      res.status(200).send('Updated')
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