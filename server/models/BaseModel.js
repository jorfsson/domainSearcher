const Bookshelf = require('../database.js');

const BaseModel = Bookshelf.Model.extend({},
  {
    findOne: function (selectData, callback) {
      return this.forge(selectData).fetch(callback);
    },
    upsert: async function (selectData) {
      const existingModel = await this.findOne(selectData);
      return existingModel ? existingModel : await new this(selectData).save();
    }
  },
);

module.exports = BaseModel;
