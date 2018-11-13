const express = require('express');
const router = express.Router();
const { getDomains, createSearch, createDomains, createResults, getResults } = require('../controllers/searchController');

router.post('/', createSearch, getDomains, createDomains, createResults, getResults);

router.post('/test', (req, res) => {
  res.send('Success!')
})

module.exports = router;
