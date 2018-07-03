# Monarch API

## Setup

* Install [Yarn][yarn-setup].
* Install [Postgres][postgres-setup].
* Install NPM dependencies: `yarn`
* Generate JWT keys: `yarn gen-keys`
* Create database tables:

```bash

psql -U postgres -h localhost -c 'CREATE DATABASE monarch_dev;' &&
psql -U postgres -h localhost -c 'CREATE DATABASE monarch_test;'

```
* Establish table schema:

```bash

knex migrate:latest --env develop &&
knex migrate:latest --env test

```

## Running Server

1. `yarn start`

## Running Tests

1. `yarn test`


[yarn-setup]: https://yarnpkg.com/lang/en/docs/install/
[postgres-setup]: https://www.postgresql.org/download/
