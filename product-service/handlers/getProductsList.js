'use strict';

const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api');
const { getBatchProductsStocks } = require('../scripts/get-batch-products-stocks');

const getProductsList = async () => {
  try {
    const products = await getBatchProductsStocks()

    return buildSuccessResponse(products);
  } catch (error) {
    return buildFailedResponse(error)
  }
}

exports.getProductsList = getProductsList;
