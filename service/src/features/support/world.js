const {setWorldConstructor} = require('cucumber');

process.env.NODE_ENV = 'test';
function MonarchWorld() {}

setWorldConstructor(MonarchWorld);
