const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let User = require('../models/User');
exports.register = async (req, res) => {
  console.log('registering!')
  const { body } = req,
        { username, password } = body,
        hashed = bcrypt.hashSync(password, 8);
  try {
    let user = await User.register({ username, password: hashed });
    let token = jwt.sign({ user }, process.env.secret, { expiresIn: '1h' });
    console.log(user);
    res.status(200).send({ auth: true, token });
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
    let token = jwt.sign({ user }, process.env.secret, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
