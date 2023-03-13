/* eslint-disable require-jsdoc */
const AWS = require('aws-sdk');

class DynamoDB {
  documentClient;
  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient();
  }

  retrieveParticipantList() {
    return this.documentClient
        .scan({
          TableName: process.env.TABLE_NAME,
        }).promise();
  }
}

const DynamoDBInstance = new DynamoDB();

module.exports = {DynamoDBInstance};
