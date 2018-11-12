const BaseModel = require('./BaseModel.js');

require('./Search');

let Domain = BaseModel.extend({
  tableName: 'domains',
  searches: function() {
    return this.belongsToMany(Search, 'search_results')
  }
});

module.exports = Domain;
