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

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());
app.use(express.json())

const port = 3001