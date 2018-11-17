const BaseModel = require('./BaseModel.js');

let Domain = require('./Domain');

let Result = BaseModel.extend({
    tableName: "searches_domains",
    search: function() {
      return this.belongsTo(Searches, 'search_id', 'id');
    },
    domain: function() {
      return this.belongsTo(Domains, 'domain_id', 'id');
    }
  }, {
    addConversion: async function(data) {
      let existing = await this.findOne({ data }), total = existing.get('conversions');
      existing.set('conversions', total + 1);
    },
    subtractConversion: async function(data) {
      let existing = await this.findOne({ data }), total = existing.get('conversions');
      existing.set('conversions', total - 1);
    }
  }
)

module.exports = Result;
