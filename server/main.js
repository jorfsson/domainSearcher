const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const server = require('http').Server(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.post('/', (req, res) => {
  console.log(req.body);
  res.send([
    {
      name: req.body.data,
      link: `http://${req.body.data}.com`
    },
    {
      name: req.body.data,
      link: `http://footlocker.com`
    }
  ]);
})

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
});
