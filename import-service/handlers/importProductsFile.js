const AWS = require("aws-sdk");
const { buildSuccessResponse, buildFailedResponse } = require('../helpers/api')
const config = require('../config')

const importProductsFile = async (event) => {
  try {
    const s3 = new AWS.S3({ region: config.region });

    const { name } = event.queryStringParameters;

    const params = {
        Bucket: config.bucket,
        Key: `uploaded/${name}`,
        Expires: 60,
        ContentType: `text/csv`
    };

    const response = await s3.getSignedUrlPromise("putObject", params);

    return buildSuccessResponse(JSON.parse(JSON.stringify(response)));
  } catch (error) {
      return buildFailedResponse(error);
  }
}

exports.importProductsFile = importProductsFile