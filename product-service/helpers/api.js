const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const buildSuccessResponse = (data) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2),
    headers
  }
}

const buildFailedResponse = (error) => {
  console.error(error);

  return {
    statusCode: 500,
    body: JSON.stringify({ message: error.message }),
    headers
  }
}

exports.buildSuccessResponse = buildSuccessResponse
exports.buildFailedResponse = buildFailedResponse
