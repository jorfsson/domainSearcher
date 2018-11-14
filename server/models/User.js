const BaseModel = require('./BaseModel.js');
const bcrypt = require('bcryptjs');

let User = BaseModel.extend({ tableName: 'users'}, {
  register: async function (data) {
    let existing = await this.findOne({ username: data.username });
    return existing ? new Error(`Username already exists.`) : await new this(data).save();
  },
  login: async function (data) {
    let existing = await this.findOne({ username: data.username});
    return existing ? bcrypt.compare(data.password, existing.get('password')).then((res) => res ? existing : new Error('Password is incorrect'))
    : new Error('User not found');
  }
})

module.exports = User;
