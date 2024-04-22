const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express(); 

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

app.get('/search', (req, res) => {
  con.query(query, (err, results) => {
    if (err) {
      console.log(err)
    }
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

app.listen(port, () => {
  console.log(`started at localhost:${port}`)
})