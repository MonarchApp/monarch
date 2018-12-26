# Monarch Service

Backend service for Monarch.

## Setup

Run the following commands to get started:

1. Install [Docker][docker-compose].
1. Install [Docker Compose][docker-compose-setup].

## Running Server

### Using entire stack
If you want to run entire stack in `docker-compose`, use the
`docker-compose.app.yml` file by using the `-f` option before
each command.

### Using partial stack plus node service

Run the default command to start up all containers, sans node:

```bash
docker-compose up
```

Then boot up the node server:

```bash
yarn start
```

Note: On first run a key-pair needs to be generated: 
```bash 
yarn gen-keys
```

## Running Tests

When running tests, make sure you have all containers running
by running:

```bash
docker-compose up
```

Once the containers are running, run the following command:

```bash
yarn test
```

[docker-compose]: https://docs.docker.com/install/
[docker-compose-setup]: https://docs.docker.com/compose/install/
