const co = require('co');
const initServer = require('./src/server');

co(function* () {
  yield initServer();
});
