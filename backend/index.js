'use strict';

const { createServer } = require('./scripts/createServer.js');

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
