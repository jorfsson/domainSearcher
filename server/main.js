const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
const port = 3000;
const server = require('http').Server(app);
const { grabDomains } = require('./eventHandler.js');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/', (req, res) => {
  Promise.all(grabDomains(req.body.data)).then((data) => { res.send(data) });
})

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
});
