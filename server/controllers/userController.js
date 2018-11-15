const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { body } = req,
        { username, password } = body,
        hashed = bcrypt.hashSync(password, 8);
  try {
    let user = await User.register({ username, password: hashed });
    let token = jwt.sign({ user }, process.env.secret, { expiresIn: '1h' });
    res.send({ auth: true, token, status: 200, username });
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

exports.login = async (req, res) => {
  const { body } = req,
        { username, password } = body;
  try {
    let user = await User.login({username, password});
    console.log('user: ', user)
    let token = jwt.sign({ user }, process.env.secret, { expiresIn: '1h' });
    console.log('token: ', token)
    res.status(200).send({ auth: true, token, status: 200, username });
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
