const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { body } = req,
        { username, password } = body,
        hashed = bcrypt.hashSync(password, 8);
  try {
    let user = await User.register({ username, password: hashed });
    let token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });
    res.status(201).json({ auth: true, token, status: 201, message: 'Successfully registered!' });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
  const { body } = req,
        { username, password } = body;
  try {
    let user = await User.login({username, password});
    let token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });
    res.status(200).json({ auth: true, token, status: 202, message: 'Login successful!' });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
