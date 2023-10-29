const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': '*',
}

const buildSuccessResponse = (data) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2),
    headers
  }
}

const buildFailedResponse = (error, statusCode = 500) => {
  console.error(error);

  return {
    statusCode,
    body: JSON.stringify({ message: error.message }),
    headers
  }
}

exports.buildSuccessResponse = buildSuccessResponse
exports.buildFailedResponse = buildFailedResponse
