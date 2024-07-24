const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(require('../config/config.json').development);

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  category: DataTypes.STRING,
  namespaceId: DataTypes.STRING,
  name: DataTypes.STRING,
  capacityAvailable: DataTypes.ARRAY(DataTypes.STRING),
  capacity: DataTypes.STRING,
  priceRegular: DataTypes.INTEGER,
  priceDiscount: DataTypes.INTEGER,
  colorsAvailable: DataTypes.ARRAY(DataTypes.STRING),
  color: DataTypes.STRING,
  images: DataTypes.ARRAY(DataTypes.STRING),
  description: DataTypes.JSONB,
  screen: DataTypes.STRING,
  resolution: DataTypes.STRING,
  processor: DataTypes.STRING,
  ram: DataTypes.STRING,
  cell: DataTypes.ARRAY(DataTypes.STRING),
}, {
    tablename: 'products',
  }
);

async function getProductCards() {
  return Product.findAll();
}

// TODO -- add attributes
async function getProductCardsByCategory(category) {
  return Product.findAll({
    where: { category },
  });
}

async function getProduct(id) {
  return Product.findByPk(id)
}

module.exports = {
  Product,
  getProductCards,
  getProductCardsByCategory,
  getProduct,
};
