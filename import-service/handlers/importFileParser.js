const AWS = require("aws-sdk");
const config = require("../config");
const csvParser = require("csv-parser");

const parseCsv = async (event)=>  {
    const s3 = new AWS.S3({ region: config.region });

    try {
        const params = {
            Bucket: event.Records[0].s3.bucket.name,
            Key: event.Records[0].s3.object.key,
        };

        await new Promise((resolve, reject) => {
            s3.getObject(params)
                .createReadStream()
                .pipe(csvParser())
                .on('data', data => {
                    console.info('CSV file row data:', data);
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
            Bucket: event.Records[0].s3.bucket.name,
            CopySource: event.Records[0].s3.bucket.name + '/' + event.Records[0].s3.object.key,
            Key: event.Records[0].s3.object.key.replace("uploaded", "parsed")
        })
        .promise();

        console.log('File copied to ', "/parsed");

        await s3.deleteObject({
            Bucket: event.Records[0].s3.bucket.name,
            Key: event.Records[0].s3.object.key
        })
        .promise();

        console.log('Old file deleted', event.Records[0].s3.object.key);
    } catch (error) {
        console.log(error.message);
    }
}
const importFileParser = async (event) => {
    await parseCsv(event);
    await moveCsv(event);
};

exports.importFileParser = importFileParser;
