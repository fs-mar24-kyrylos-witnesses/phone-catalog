const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // Middleware to set headers
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  // Routes
  const productRoutes = require('../routes/product.route.cjs');
  app.use('/', productRoutes);

  return app;
}

module.exports = {
  createServer,
};
