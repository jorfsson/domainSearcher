const knex = require('knex')({
  client: 'postgresql',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'hello',
    database: 'domainSearch',
    charset: 'utf-8'
  }
});

const bookshelf = require('bookshelf')(knex);

let User = bookshelf.Model.extend({
  tableName: 'users'
})

let Domain = bookshelf.Model.extend({
  tableName: 'domains',
  searches: function() {
    return this.belongsToMany(SearchTerm, 'search_results')
  }
})

let SearchTerm = bookshelf.Model.extend({
  tableName: 'searches',
  results: function() {
    return this.belongsToMany(Domain, 'search_results')
  }
})

let Results = bookshelf.Model.extend({
  tableName: 'search_results'
})

const search = (term) =>
  new SearchTerm({ searchTerm: term }).save()
  .then((newRow) => { console.log(`Added search term '${term}' at row ${newRow.id}`); return newRow.id })
  .catch((err) => { console.log(err) })

const addResults = (results, searchID) => {
  results.forEach((result) => {
    new Domain({ URL: result })
    .save()
    .then((newRow) => { new Results({ search_id: searchID, domain_id: newRow.id })
      .save()
      .then((newRow) => { console.log(`New search result created at ${newRow.id}`) })
      .catch((err) => { console.log(`Error creating new Results record: ${err}`) })
    })
    .catch((err) => { console.log(`Error creating new Domain record: ${err}`) })
  })
}

module.exports.search = search;
module.exports.addResults = addResults;
