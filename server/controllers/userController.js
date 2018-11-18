const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  let { username, password } = req.body,
      hashed = bcrypt.hashSync(password, 8);
  try {
    let user = await User.register({
      username,
      password: hashed
    }),
    token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });
    res.status(201).json({
      token,
      auth: true,
      status: 201,
      message: 'Successfully registered!'
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

exports.login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await User.login({username, password}),
    token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });
    res.status(200).json({
      token,
      auth: true,
      status: 202,
      message: 'Login successful!'
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
