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
      console.log('model data: ', data);
      let existing = await this.findOne({ search_id: data.search_id, domain_id: data.domain_id }), total = existing.get('conversions');
      total += 1;
      existing.save({ conversions: total }, { patch: true})

    },
    subtractConversion: async function(data) {
      let existing = await this.findOne({ search_id: data.search_id, domain_id: data.domain_id }), total = existing.get('conversions');
      if (total > 0) {
        total -= 1;
        existing.save({ conversions: total }, { patch: true })
      }
    }
  }
)

module.exports = Result;
