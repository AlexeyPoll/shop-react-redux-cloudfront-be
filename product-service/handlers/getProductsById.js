'use strict';

const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api');
const { getProductStockById } = require('../scripts/get-product-stock-by-id');

const getProductsById = async (event) => {
  try {
    const product = await getProductStockById(event.pathParameters.productId)

    if (!product) {
      throw new Error('The product was not found! Check the ID.')
    }

    return buildSuccessResponse(product);
  } catch (error) {
    return buildFailedResponse(error)
  }
}

exports.getProductsById = getProductsById;
