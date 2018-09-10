# Monarch Service

Backend service for Monarch.

## Setup

Run the following commands to get started:

1. Install [Docker][docker-compose].
1. Install [Docker Compose][docker-compose-setup].
1. Start containers:

    ```bash
    docker-compose up
    ```

## Running Tests

When running tests, make sure you have all containers running
by running `docker-compose up`. Once the containers are running,
run the following command:

```bash
docker-compose run monarch yarn test
```

[docker-compose]: https://docs.docker.com/install/
[docker-compose-setup]: https://docs.docker.com/compose/install/
