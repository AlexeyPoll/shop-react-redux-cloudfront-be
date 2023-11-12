'use strict';

const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api');
const { putBatchProductsStocks } = require('../scripts/put-batch-products-stocks');
const config = require('../config')
const AWS = require('aws-sdk');

const catalogBatchProcess = async (event) => {
  const notifier = new AWS.SNS({region: config.region});

  try {
    console.log('Start SQS!');
    
    for (const record of event.Records) {
        const { body } = record;
        const data = JSON.parse(body);
        const { count, price, description, title } = data || {}

        await putBatchProductsStocks({ count, price, description, title });

        await notifier.publish({
            Subject: 'Product successfully added to database',
            Message: `Product ${data.title} was added to the database`,
            TopicArn: process.env.SNS_ARN,
            MessageAttributes: {
                title: {
                    DataType: "String",
                    StringValue: data.title
                }
            }
        }).promise();
    }

    return buildSuccessResponse("Success catalogBatchProcess!");
  } catch (error) {
    return buildFailedResponse(error)
  }
}

exports.catalogBatchProcess = catalogBatchProcess;
