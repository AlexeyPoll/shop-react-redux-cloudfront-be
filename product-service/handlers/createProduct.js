'use strict';

const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api');
const { putBatchProductsStocks } = require('../scripts/put-batch-products-stocks');

const createProduct = async (event) => {
  const data = JSON.parse(event.body)
  const { count, price, description, title } = data || {}

  if (!count || !price || !description || !title) {
    return buildFailedResponse("You forgot something while filling the form!", 400)
  }
  
  try {
    await putBatchProductsStocks({ count, price, description, title })

    return buildSuccessResponse("Successfully created!");
  } catch (error) {
    return buildFailedResponse(error)
  }
}

exports.createProduct = createProduct;
