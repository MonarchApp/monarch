module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'monarch_dev',
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
