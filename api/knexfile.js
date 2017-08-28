module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'monarch_dev',
      user: 'postgres'
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  }
};
