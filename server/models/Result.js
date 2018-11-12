const Bookshelf = require('../database.js');

let Result = Bookshelf.Model.extend({
  tableName: 'search_results'
})

module.exports = Bookshelf.Model('Result', Result);
