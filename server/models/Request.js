const Bookshelf = require('../database.js');

const Request = Bookshelf.Model.extend({
  tableName: "requests"
});

module.exports = Request;
