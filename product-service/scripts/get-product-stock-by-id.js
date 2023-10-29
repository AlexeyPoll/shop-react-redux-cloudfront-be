const { getBatchProductsStocks } = require("./get-batch-products-stocks");


const getProductStockById = async (id) => {
  const batchProductsStocks = await getBatchProductsStocks()

  return batchProductsStocks.find((item) => item.id === id)
}

exports.getProductStockById = getProductStockById
