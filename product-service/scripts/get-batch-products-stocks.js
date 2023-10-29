const { getProductsTable } = require("./get-products-table");
const { getStocksTable } = require("./get-stocks-table");

const getBatchProductsStocks = async () => {
  const products = await getProductsTable()
  const stocks = await getStocksTable()

  return products.Items.map(product => ({
    ...product,
    ...(stocks.Items.find(stock => stock.product_id === product.id))
  }))
}

exports.getBatchProductsStocks = getBatchProductsStocks
