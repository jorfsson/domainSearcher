let Domain = require('../models/Domain');
let Result = require('../models/Result');
let Search = require('../models/Search');
let User = require('../models/User');

exports.getDomains = (req, res) => {
    let query = req.body.data, options = {
      url: 'https://www.googleapis.com/customsearch/v1',
      qs: {
        key: 'AIzaSyBXGkVilmqEN0KSDAaQy1BlVVIA8r4nS6w',
        cx: '009637816073108880163:nfsysoqnztc',
        q:
      }
    };
    return request(options).then((response) => JSON.parse(response))
    .then((data) => data.items.map((item) => item.link))
    .then((search_results) => )



      addResults(query, results);
      return {
        name: query,
        link: results[0]
      }
    })
    .catch((err) => { console.log(err) })
  })
}

exports.createSearch = (term) =>
  new Search({ search_term: term }).save()
  .then((newRow) => { console.log(`Added search term '${term}' at row ${newRow.id}`); return newRow.id })
  .catch((err) => { console.log(err.error) })

exports.createDomain = (domain) =>
  new Domain({ url: domain }).save()
  .then((newRow) => { console.log(`Added new Domain '${domain}' at row ${newRow.id}`); return newRow.id })
  .catch((err) => { console.log(`New Domain record: ${err}`) })

exports.createResult = (search_id, domain_id) =>
  new Results({ search_id: search_id, domain_id: domain_id }).save()
  .then((result) => { console.log('Success!')})
  .catch((err) => { console.log(err) })

exports.addResults = (search, results) => {
  createSearch(search).then((search_id) => {
    results.forEach((result) => {
      createDomain.then((domain_id) => {
        createResult(search_id, domain_id);
      })
    })
  })
}
