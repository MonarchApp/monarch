# Monarch API

## Setup

1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/).
1. Install [Postgres][postgres-setup].
1. Install NPM dependencies: `yarn`
1. Create database tables: `psql -U postgres -h localhost -c 'CREATE TABLE monarch_dev; CREATE TABLE monarch_test'`
1. Establish table schema: `knex migrations:latest`

## Running Server

1. `yarn start`

## Running Tests

1. `yarn test`


[postgres-setup]: https://www.postgresql.org/download/
