module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      database: 'monarch_dev',
      host: 'localhost',
      user: 'postgres'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './env/development/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      database: 'monarch_test',
      host: 'localhost',
      user: 'postgres'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './env/test/seeds'
    }
  }
};
