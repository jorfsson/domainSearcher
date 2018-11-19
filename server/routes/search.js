const express = require('express');
const router = express.Router();
const { getDomains, createSearch, createDomains, createResults, getResults, convert } = require('../controllers/searchController');
const { authorize } = require('../controllers/authController.js');

router.post('/', authorize, createSearch, getDomains, createDomains, createResults, getResults);

router.post('/convert', authorize, convert);

module.exports = router;
