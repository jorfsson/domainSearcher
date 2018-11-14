const BaseModel = require('./BaseModel.js');

let Domain = BaseModel.extend({
  tableName: "domains"
});

module.exports = Domain;
