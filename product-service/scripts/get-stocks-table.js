const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const getStocksTable = async () => {
  const command = new ScanCommand({
    TableName: process.env.STOCKS_TABLE,
  });

  try {
    const response = await docClient.send(command);

    return response;
  } catch(error) {
    console.error('Error while reading Stocks!', error.message)

    throw new Error(error.message)
  }
};

exports.getStocksTable = getStocksTable
