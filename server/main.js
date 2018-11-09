const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const server = require('http').Server(app);

app.get('/proxy', (req, res) => {
  console.log('Proxy working!');
  res.send('Hello Guy');
})

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
});
