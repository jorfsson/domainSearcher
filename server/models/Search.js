const BaseModel = require('./BaseModel.js');

require('./Domain');

let Search = BaseModel.extend({
  tableName: 'searches',
  results: function() {
    return this.belongsToMany(Domain, 'search_results')
  }
})

module.exports = Search;
