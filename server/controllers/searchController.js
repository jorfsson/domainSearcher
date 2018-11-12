const request = require('request-promise');
const Domain = require('../models/Domain');
const Result = require('../models/Result');
const Search = require('../models/Search');
const User = require('../models/User');

exports.getDomains = async (req, res, next) => {
    let options = {
      url: 'https://www.googleapis.com/customsearch/v1',
      qs: {
        key: 'AIzaSyBXGkVilmqEN0KSDAaQy1BlVVIA8r4nS6w',
        cx: '009637816073108880163:nfsysoqnztc',
        q: req.body.data
      }
    };
    try {
      let results = JSON.parse(await request(options)).items.map((item) => item.link);
      req.results = results;
    } catch (err) {
      console.log(err);
    }
    next();
}

exports.createSearch = async (req, res, next) => {
  try {
    let searchEntry = await Search.upsert({ search_term: req.body.data })
    req.searchID = searchEntry.id;
  } catch (err) {
    console.log(err);
  }
  next();
}

exports.createDomains = async (req, res, next) => {
  try {
    let domainEntries = await Promise.all(req.results.map((result) => Domain.upsert({ url: result })));
    req.domainIDs = domainEntries.map((domain) => domain.id);
  } catch (err) {
    console.log(err);
  }
  next();
}

exports.createResults = async (req, res, next) => {
  try {
    await Promise.all(req.domainIDs.map((domainID) => Result.upsert({ search_id: req.searchID, domain_id: domainID })));
    console.log('Success!');
  } catch (err) {
    console.log(err);
  }
  next();
}

exports.getResults = (req, res) => {
  Result.where({ search_id: req.searchID })
  .fetchAll()
  .then((results) => {
    res.send(results)
  })
}
