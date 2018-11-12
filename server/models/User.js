const Bookshelf = require('../database.js');

let User = Bookshelf.Model.extend({
  tableName: 'users'
})

module.exports = Bookshelf.Model('User', User);
