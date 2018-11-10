const path = require('path');
const request = require('request-promise');
const qs = require('querystring');

const grabDomains = (queries) =>
    queries.map((query) => {
      let options = {
        url: 'https://www.googleapis.com/customsearch/v1',
        qs: {
          key: 'AIzaSyBXGkVilmqEN0KSDAaQy1BlVVIA8r4nS6w',
          cx: '009637816073108880163:nfsysoqnztc',
          q: query
        }
      };
      return request(options)
      .then((response) => ({ name: query, link: JSON.parse(response).items[0].link }))
      .catch((err) => { console.log(err) })
    })

module.exports.grabDomains = grabDomains;
