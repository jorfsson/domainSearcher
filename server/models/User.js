const BaseModel = require('./BaseModel.js');
const bcrypt = require('bcryptjs');

let User = BaseModel.extend({ tableName: 'users'}, {
  register: async function (data) {
    let existing = await this.findOne({ username: data.username });
    return existing ? Promise.reject(new Error(`Username already exists.`)) : await new this(data).save();
  },
  login: async function (data) {
    let existing = await this.findOne({ username: data.username});
    return existing ? bcrypt.compare(data.password, existing.get('password')).then((res) => res ? existing : Promise.reject(new Error('Password is incorrect')))
    : Promise.reject(new Error('User not found'));
  }
})

module.exports = User;
