const Bookshelf = require('../database.js');

const BaseModel = Bookshelf.Model.extend({},
  {
    findOne: function (selectData, callback) {
      return this.forge(selectData).fetch(callback);
    },
    upsert: async function (selectData, updateData) {
      const existingModel = await this.findOne(selectData);
      if (existingModel) {
        return await existingModel.set(updateData).save();
      } else {
        return await new this(updateData).save();
      }
    }
  },
);

module.exports = BaseModel;
