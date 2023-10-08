'use strict';

const { getProductsList } = require('./handlers/getProductsList')
const { getProductsById } = require('./handlers/getProductsById')

exports.getProductsList = getProductsList;
exports.getProductsById = getProductsById;
