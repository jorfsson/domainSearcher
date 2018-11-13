const Bookshelf = require('../database.js');

const BaseModel = Bookshelf.Model.extend({},
  {
    check: function (data, callback) {
      return this.forge(data).fetch(callback);
    },
    upsert: async function (data) {
      let existing = await this.findOne(data);
      return existing ? existing : await new this(data).save();
    }
  },
);

module.exports = BaseModel;
