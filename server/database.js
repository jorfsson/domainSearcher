const knex = require('knex')({
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'hello',
      database: 'domains',
      charset: 'utf-8'
    }
  }), Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');

module.exports = Bookshelf;
