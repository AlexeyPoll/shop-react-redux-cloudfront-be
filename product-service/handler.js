'use strict';

const { getProductsList } = require('./handlers/getProductsList')
const { getProductsById } = require('./handlers/getProductsById')
const { createProduct } = require('./handlers/createProduct')


exports.getProductsList = getProductsList;
exports.getProductsById = getProductsById;
exports.createProduct = createProduct;
