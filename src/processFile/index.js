const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Get the uploaded file details from the S3 event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    
    // Create S3 client
    const s3 = new AWS.S3();
    
    // Get the file content
    const params = {
      Bucket: bucket,
      Key: key
    };
    
    const data = await s3.getObject(params).promise();
    const fileContent = data.Body.toString('utf-8');
    
    // Store in DynamoDB
    const dbParams = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: 'latest',  // Using a constant ID to always update the same item
        message: fileContent,
        filename: key,
        timestamp: new Date().toISOString()
      }
    };
    
    await dynamoDB.put(dbParams).promise();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File processed successfully' })
    };
  } catch (error) {
    console.error('Error processing file:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process file' })
    };
  }
};