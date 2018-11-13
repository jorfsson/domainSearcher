const BaseModel = require('./BaseModel.js');

let Domain = require('./Domain'),
    Result = require('./Result');

let Search = BaseModel.extend({
  tableName: 'searches',
  results: function() {
    return this.belongsToMany(Domain, 'searches_domains', 'search_id', 'domain_id');
  }
})

module.exports = Search;
