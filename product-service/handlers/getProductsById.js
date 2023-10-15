'use strict';

const { products } = require('../data/products')
const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api')

const getProductsById = async (event) => {
  const product = products.find(({ id }) => id === event.pathParameters.productId);

  try {
    if (!product) {
      throw new Error('The product was not found! Check the ID.')
    }

    return buildSuccessResponse(product);
  } catch (error) {
    return buildFailedResponse(error)
  }
}

exports.getProductsById = getProductsById;
