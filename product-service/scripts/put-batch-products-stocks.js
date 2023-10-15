const { randomUUID } = require('crypto');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { BatchWriteCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const putBatchProductsStocks = async ({ count, price, description, title }) => {
  const UUID = randomUUID();

  const productsPutRequests = {
    PutRequest: {
      Item: { id: UUID, price, title, description },
    },
  };

  const stocksPutRequests = {
    PutRequest: {
      Item: { product_id: UUID, count },
    },
  };

  const command = new BatchWriteCommand({
    RequestItems: {
      'Products': [productsPutRequests],
      'Stocks': [stocksPutRequests],
    },
  });

  await docClient.send(command);
};

exports.putBatchProductsStocks = putBatchProductsStocks
