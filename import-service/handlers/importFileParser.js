const AWS = require("aws-sdk");
const config = require("../config");
const csvParser = require("csv-parser");

const parseCsv = async (event)=>  {
    const s3 = new AWS.S3({ region: config.region });
    const sqs = new AWS.SQS({ region: config.region });

    try {
        const params = {
            Bucket: event.s3.bucket.name,
            Key: event.s3.object.key,
        };

        await new Promise((resolve, reject) => {
            s3.getObject(params)
                .createReadStream()
                .pipe(csvParser({ separator: ';' }))
                .on('data', data => {
                    console.info('CSV file row data:', data);

                    sqs.sendMessage({
                        QueueUrl: process.env.SQS_URL,
                        MessageBody: JSON.stringify(data),
                    }, (err) => {
                        if (err) {
                            console.log('>>> ERROR:', err.message)
                        }
                        
                        const { title } = data;
                        console.log('Send message for product: ', title);
                    })
                })
                .on('error', error => {
                    reject(error.message);
                })
                .on('end', () => {
                    resolve('success');
                })
        });

    } catch (error) {
        console.log(error.message);
    }
}

const moveCsv = async (event)=>  {
    const s3 = new AWS.S3({ region: config.region });

    try {
        await s3.copyObject({
            Bucket: event.s3.bucket.name,
            CopySource: event.s3.bucket.name + '/' + event.s3.object.key,
            Key: event.s3.object.key.replace("uploaded", "parsed")
        })
        .promise();

        console.log('File copied to ', "/parsed");

        await s3.deleteObject({
            Bucket: event.s3.bucket.name,
            Key: event.s3.object.key
        })
        .promise();

        console.log('Old file deleted', event.s3.object.key);
    } catch (error) {
        console.log(error.message);
    }
}
const importFileParser = async (event) => {
    for (const record of event.Records) {
        await parseCsv(record);
        await moveCsv(record);
    }
};

exports.importFileParser = importFileParser;
