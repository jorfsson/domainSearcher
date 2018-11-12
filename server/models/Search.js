const Bookshelf = require('../database.js');

require('./Domain');

let Search = Bookshelf.Model.extend({
  tableName: 'searches',
  results: function() {
    return this.belongsToMany(Domain, 'search_results')
  }
})

module.exports = Bookshelf.Model('Search', Search);
