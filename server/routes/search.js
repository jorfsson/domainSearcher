const express = require('express');
const router = express.Router();
const path = require('path');
const request = require('request-promise');
const { getDomains } = require('../searchController');
const { addResults, Search, Domain, Results } = require('../../database/queries');

router.post('/', getDomains);
