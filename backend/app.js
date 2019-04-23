const express = require('express');
const app = express();

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

const userRoutes = require('../api/routes/users');

const bodyParser = require("body-parser");


app.use(bodyParser.json());

app.use('/users', userRoutes);

module.exports = app;

