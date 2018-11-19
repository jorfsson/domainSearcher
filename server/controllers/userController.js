const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  let { username, password } = req.body,
      hashed = bcrypt.hashSync(password, 8);
  try {
    let user = await User.register({ username, password: hashed }),
      token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });
    res.json({
      status: 201,
      token,
      auth: true,
      message: 'Successfully registered!'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await User.login({username, password}),
        token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });
    res.json({
      status: 202,
      token,
      auth: true,
      message: 'Login successful!'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
