const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const search = require('./routes/search.js');
const app = express();
const port = 3000;
const server = require('http').Server(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/search', search);

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
});
