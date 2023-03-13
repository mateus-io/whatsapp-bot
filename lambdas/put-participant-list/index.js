const {sendResponse} = require('./Response');
const {DynamoDBInstance} = require('./services/DynamoDB');

exports.handler = async (event, _context) => {
  try {
    const requestBody = JSON.parse(event.body);
    console.log(requestBody)
    const response = await DynamoDBInstance.putParticipantList({
      "present": requestBody.present,
      "absent": requestBody.absent,
      "groupName": requestBody.groupName,
      "date": requestBody.date,
      "slug": requestBody.slug
    });
    return sendResponse(200, JSON.stringify(response));
  } catch (err) {
    return sendResponse(500, JSON.stringify(err));
  }
};
