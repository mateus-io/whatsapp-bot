const {sendResponse} = require('./Response');
const {DynamoDBInstance} = require('./services/DynamoDB');

exports.handler = async (_, _context) => {
  try {
    const response = await DynamoDBInstance.retrieveParticipantList();
    return sendResponse(200, JSON.stringify(response));
  } catch (err) {
    return sendResponse(500, JSON.stringify(err));
  }
};
