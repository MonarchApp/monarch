const {killKnex} = require('../src/utils/test_utils.js');

after(async function() {
  await killKnex();
});
