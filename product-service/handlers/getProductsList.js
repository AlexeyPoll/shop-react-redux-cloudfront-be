'use strict';

const { products } = require('../data/products')
const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api')

const getProductsList = async () => {
  try {
    return buildSuccessResponse(products);
  } catch (error) {
    return buildFailedResponse(error)
  }
}

exports.getProductsList = getProductsList;
