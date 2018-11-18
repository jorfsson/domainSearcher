const request = require('request-promise');
const Domain = require('../models/Domain');
const Result = require('../models/Result');
const Search = require('../models/Search');

exports.createSearch = async (req, res, next) => {
  try {
    let searchEntry = await Search.upsert({ search_term: req.body.search });
    req.searchID = searchEntry.id;
  } catch (err) {
    console.log(err);
  }
  next();
}

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
    console.log(err)
  }
  next();
}

exports.createDomains = async (req, res, next) => {
  try {
    let domainEntries = [];
    for (let i = 0; i < req.results.length; i++) {
      let domain = async (result) => await Domain.upsert({ url: result });
      await domain(req.results[i])
      .then((res) => { domainEntries.push(res) });
    }
    req.domainIDs = domainEntries.map((domain) => domain.id);
  } catch (err) {
    console.log(err);
  }
  next();
}

exports.createResults = async (req, res, next) => {
  try {
    await Promise.all(req.domainIDs.map((domainID) =>
      Result.upsert({
        search_id: req.searchID,
        domain_id: domainID
      })
    ));
  } catch (err) {
    console.log(err);
  }
  next();
}

exports.getResults = (req, res) => {
  Search.where({ search_term: req.body.search })
  .fetch({
    withRelated: [{
      results: (result) => { result.orderBy('searches_domains.conversions', 'DESC') }
    }]
  })
  .then((results) => res.json(results))
}

exports.convert = async (req, res) => {
  let { current, previous } = req.body;
  if (previous.search_id !== undefined) {
    await Result.subtractConversion({
      search_id: previous.search_id,
      domain_id: previous.domain_id
    })
  }
  await Result.addConversion({
    search_id: current.search_id,
    domain_id: current.domain_id
  })
  res.status(200).json({ message: 'Conversion successful!' })
}
