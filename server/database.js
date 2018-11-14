const knex = require('knex')({
    client: 'pg',
    connection: {
      host: process.env.db_host,
      user: process.env.db_user,
      password: process.env.db_password,
      database: process.env.db_database,
      charset: 'utf-8'
    }
  }), Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;
