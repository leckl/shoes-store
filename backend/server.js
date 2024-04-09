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
	database: 'shoes-shop',
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

app.listen(port, () => {
  console.log(`started at localhost:${port}`)
})