/* eslint-disable require-jsdoc */
const AWS = require('aws-sdk');

class DynamoDB {
  documentClient;
  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient();
  }
  putParticipantList(item) {
    return this.documentClient
        .put({
          TableName: process.env.TABLE_NAME,
          Item: item,
        }).promise();
  }
}

const DynamoDBInstance = new DynamoDB();

module.exports = {DynamoDBInstance};
