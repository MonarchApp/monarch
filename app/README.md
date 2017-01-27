# TransSponsor App

## Setup

0. Install ![Elm](https://guide.elm-lang.org/install.html).
0. Make the project `elm-make Main.elm --output=dist/index.html`

## Testing

- Install the test runner: `npm install -g elm-test`
- Run `elm-test`.
- Edit tests/Tests.elm to introduce new tests

All the dependencies from `elm-package.json` must be kept in sync with
`tests/elm-package.json`.
