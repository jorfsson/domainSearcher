const BaseModel = require('./BaseModel.js');

let User = BaseModel.extend({
  tableName: 'users'
})

module.exports = User;
