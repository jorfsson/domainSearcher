const path = require('path');
const request = require('request-promise');
const qs = require('querystring');
const { search, addResults } = require('../../database/queries');

const grabDomains = (queries) =>
    queries.map((query) => {
      let options = {
        url: 'https://www.googleapis.com/customsearch/v1',
        qs: {
          key: 'AIzaSyBXGkVilmqEN0KSDAaQy1BlVVIA8r4nS6w',
          cx: '009637816073108880163:nfsysoqnztc',
          q: query
        }
      }, searchID = search(query);
      return request(options)
      .then((response) => {
        let results = JSON.parse(response).items.map((item) => item.link);
        addResults(results);
        return {
          name: query,
          link: results[0]
        }
      })
      .catch((err) => { console.log(err) })
    })

module.exports.grabDomains = grabDomains;
