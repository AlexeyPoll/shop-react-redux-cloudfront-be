'use strict';

const { getProductsList } = require('./handlers/getProductsList')
const { getProductsById } = require('./handlers/getProductsById')
const { createProduct } = require('./handlers/createProduct')
const { catalogBatchProcess } = require('./handlers/catalogBatchProcess')


exports.getProductsList = getProductsList;
exports.getProductsById = getProductsById;
exports.createProduct = createProduct;
exports.catalogBatchProcess = catalogBatchProcess;

