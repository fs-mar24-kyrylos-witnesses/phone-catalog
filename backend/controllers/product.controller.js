const Product = require('../models/Product.model.js');
const { STATUS_CODES } = require('../constants/statusCodes.js');

const getProductCardsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.getProductCardsByCategory(category);
    res.status(STATUS_CODES.OK).send(products);
  } catch (error) {
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send({ error: 'Failed to get products by category' });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.getProduct(id);

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
  getProductCardsByCategory,
  getProduct,
};
