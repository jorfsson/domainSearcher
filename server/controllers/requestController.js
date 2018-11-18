const Request = require('../models/Request');

exports.logRequest = async (req, res) => {
  console.log(req.body.duration)
  await new Request({ duration: req.body.duration }).save();
  res.status(200).json({ message: 'Request logged' })
}
