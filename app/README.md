# Monarch App

## Setup

0. Install ![Elm](https://guide.elm-lang.org/install.html).
0. Install packages: `make install`
0. Make the project: `make`
0. Run the server: `make run`

## Testing

- Install the test runner: `npm install -g elm-test`
- Run `make test`.
- Edit tests/Tests.elm to introduce new tests.

All the dependencies from `elm-package.json` must
be kept in sync with `tests/elm-package.json`.
