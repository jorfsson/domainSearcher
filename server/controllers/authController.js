const jwt = require('jsonwebtoken');

exports.authorize = (req, res, next) => {
  let token = req.headers['authorization'];
  console.log(token);
  if (token) {
    jwt.verify(token.slice(7), process.env.secret, (err, decoded) => {
      if (err) res.status(403).json({ error: 'Authorization unsuccessful' });
      req.decoded = decoded;
      next();
    })
  } else {
    res.status(500).json({ message: 'Invalid token' });
  }
}
