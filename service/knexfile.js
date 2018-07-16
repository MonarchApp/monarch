module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'monarch_dev',
      user: 'postgres'
    },
    migrations: {
      directory: __dirname + '/src//db/migrations'
    },
    seeds: {
      directory: __dirname + '/src//db/seeds/develop'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: 'monarch_test',
      user: 'postgres'
    },
    migrations: {
      directory: __dirname + '/src/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/db/seeds/develop'
    }
  }
};
