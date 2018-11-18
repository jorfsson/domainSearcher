const express = require('express');
const router = express.Router();
const { logRequest } = require('../controllers/requestController');

router.post('/', logRequest);

module.exports = router;
