const express = require('express');
const router = express.Router();
const { getDomains, createSearch, createDomains, createResults, getResults } = require('../controllers/searchController');

router.post('/', createSearch, getDomains, createDomains, createResults, getResults);

module.exports = router;
