const BaseModel = require('./BaseModel.js');

let User = BaseModel.extend({
  tableName: 'users',
  upsert: async function (data) {
    let existing = await this.check({ username: data.username });
    return existing ? "Username already exists!" : await new this(data).save();
  },
  verify: async function (data) {
    return await this.check(data);
  }
})

module.exports = User;
