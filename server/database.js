const knex = require('knex')({
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'hello',
      database: 'domains',
      charset: 'utf-8'
    }
  }), bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
