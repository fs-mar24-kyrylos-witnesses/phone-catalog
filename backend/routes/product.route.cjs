/* eslint-disable */
const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/product.controller.js');
const ROUTES = require('../constants/routes.js');

router.get(ROUTES.PRODUCTS_PHONES, ProductsController.getProductCardsByCategory);
router.get(ROUTES.PRODUCTS_TABLETS, ProductsController.getProductCardsByCategory);
router.get(ROUTES.PRODUCTS_ACCESSORIES, ProductsController.getProductCardsByCategory);
router.get(ROUTES.PRODUCTS_ID, ProductsController.getProduct);

module.exports = router;

