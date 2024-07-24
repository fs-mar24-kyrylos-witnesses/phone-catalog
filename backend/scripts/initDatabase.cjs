const Product = require('../models/Product.cjs');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(require('../config/config.json').development);

const phones = require('../../public/api/phones.json');
const tablets = require('../../public/api/tablets.json')
const accessories = require('../../public/api/accessories.json')

const productsToAdd = [].concat(phones, tablets, accessories);

console.log(productsToAdd);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await Product.sync({ force: true });
    console.log('Database & tables created!');

    await Product.bulkCreate(productsToAdd);
    console.log('Initial data inserted!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

initializeDatabase();
