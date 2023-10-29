const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { BatchWriteCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const { products } = require('../product-service/data/products')

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getRandomArbitrary = (min, max) => Math.round(Math.random() * (max - min) + min);

const main = async () => {
  const command = new BatchWriteCommand({
    RequestItems: {
      'Products': products.map(product => ({
        PutRequest: {
          Item: product,
        },
      })),
      'Stocks': products.map(product => ({
        PutRequest: {
          Item: {
            product_id: product.id,
            count: getRandomArbitrary(1, 10)
          },
        },
      }))
    },
  });

  await docClient.send(command);
};

main()
