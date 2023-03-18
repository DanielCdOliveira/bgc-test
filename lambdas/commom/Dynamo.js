const AWS = require("aws-sdk");
const Responses = require("./API_Responses");
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID,
      },
    };
    const data = await documentClient.get(params).promise();
    if (!data || !data.Item) {
      throw Error("ERROR IN DYNAMODB");
    }
    console.log(data);
    return data.Item;
  },
};
module.exports = Dynamo;
