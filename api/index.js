const co = require('co');

co(function* () {
  yield require('./src/app')();
});
