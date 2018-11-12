const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'hello',
    database: 'domains',
    charset: 'utf-8'
  }
});

const Bookshelf = require('bookshelf')(knex);

let User = Bookshelf.Model.extend({
  tableName: 'users'
})

let Domain = Bookshelf.Model.extend({
  tableName: 'domains',
  searches: function() {
    return this.belongsToMany(Search, 'search_results')
  }
})

let Search = Bookshelf.Model.extend({
  tableName: 'searches',
  results: function() {
    return this.belongsToMany(Domain, 'search_results')
  }
})

let Results = Bookshelf.Model.extend({
  tableName: 'search_results',
})

const createSearch = (term) =>
  new Search({ search_term: term }).save()
  .then((newRow) => { console.log(`Added search term '${term}' at row ${newRow.id}`); return newRow.id })
  .catch((err) => { console.log(err.error) })

const createDomain = (domain) =>
  new Domain({ url: domain }).save()
  .then((newRow) => { console.log(`Added new Domain '${domain}' at row ${newRow.id}`); return newRow.id })
  .catch((err) => { console.log(`New Domain record: ${err}`) })

const createResult = (search_id, domain_id) =>
  new Results({ search_id: search_id, domain_id: domain_id }).save()
  .then((result) => { console.log('Success!')})
  .catch((err) => { console.log(err) })

const addResults = (search, results) => {
  createSearch(search).then((search_id) => {
    results.forEach((result) => {
      createDomain.then((domain_id) => {
        createResult(search_id, domain_id);
      })
    })
  })
}

module.exports.addResults = addResults;
module.exports.Results = Results;
module.exports.Search = Search;
module.exports.Domain = Domain;
