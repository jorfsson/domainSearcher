const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const app = express();
const server = require('http').Server(app);


require('dotenv').config()

const search = require('./routes/search.js');
const login = require('./routes/login.js');
const register = require('./routes/register.js');
const logRequest = require('./routes/logRequest.js');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, '../client/dist')))


app.use('/search', search);
app.use('/login', login);
app.use('/register', register);
app.use('/requests', logRequest);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
})

app.listen(process.env.port, () => {
  console.log(`Listening on ${process.env.port}...`)
});
