const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { body } = req,
        { username, password } = body,
        hashed = bcrypt.hashSync(password, 8);
  try {
    let user = await User.upsert({ username, password: hashed }),
        token = jwt.sign({ user }, process.env.secret, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.log(err)
    res.status(500).send('Error registering username.')
  }
}

exports.login = async (req, res) => {
  const { body } = req,
        { username, password } = body,
        hashed = bcrypt.hasSync(password, 8);
  try {
    let user = await User.verify({ username, password: hashed }),
        token = jwt.sign({ user }, process.env.secret, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.log(err)
    res.status(500).send('Error logging in.')
  }
}
