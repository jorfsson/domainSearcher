const request = require('request-promise');
const Domain = require('../models/Domain');
const Result = require('../models/Result');
const Search = require('../models/Search');

exports.getDomains = async (req, res, next) => {
    let options = {
      url: 'https://www.googleapis.com/customsearch/v1',
      qs: {
        key: 'AIzaSyBXGkVilmqEN0KSDAaQy1BlVVIA8r4nS6w',
        cx: '009637816073108880163:nfsysoqnztc',
        q: req.body.search
      }
    };
    try {
      let results = JSON.parse(await request(options)).items.map((item) => item.link);
      req.results = results;
    } catch (err) {
      console.log('get domains', err);
    }
    next();
}

exports.createSearch = async (req, res, next) => {
  console.log('creating search!')
  try {
    let searchEntry = await Search.upsert({ search_term: req.body.search })
    req.searchID = searchEntry.id;
  } catch (err) {
    console.log('createSearch', err);
  }
  next();
}

exports.createDomains = async (req, res, next) => {
  try {
    let domainEntries = [];
    for (let i = 0; i < req.results.length; i++) {
      let domain = await Domain.upsert({ url: req.results[i] })
      domainEntries.push(domain);
    }
    req.domainIDs = domainEntries.map((domain) => domain.id);
  } catch (err) {
    console.log('createDomains', err);
  }
  next();
}

exports.createResults = async (req, res, next) => {
  try {
    await Promise.all(req.domainIDs.map((domainID) =>
      Result.upsert({ search_id: req.searchID, domain_id: domainID })
    ));
    console.log('Success!');
  } catch (err) {
    console.log('createResults', err);
  }
  next();
}

exports.getResults = (req, res) => {
  Search.where({ search_term: req.body.search })
  .fetch({withRelated: ['results']})
  .then((results) => {
    res.send(results);
  })
}
