const Product = require('../models/Product.model.js');
const { STATUS_CODES } = require('../constants/statusCodes.js');
const { categories } = require('../constants/categories.js');

const getProductCards = async (req, res) => {
  // const pathSegments = req.path.split('/');
  // const category = pathSegments[pathSegments.length - 1]; // Get the last segment4

  // if (!categories.includes(category)) {
  //   res.status(STATUS_CODES.BAD_REQUEST).send({ error: 'Category does not exist' });
  //   return;
  // }

  try {
    const products = await Product.getProductCards();
    res.status(STATUS_CODES.OK).send(products);
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to get products by category' });
  }
};

const getProduct = async (req, res) => {
  const { category, id } = req.params;

  try {
    const product = await Product.getProduct(category, id);

    if (!product) {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    } else {
      res.status(STATUS_CODES.OK).send(product);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to get product' });
  }
};

module.exports = {
  getProductCards,
  getProduct,
};
