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
    return data.Item;
  },
  async write(data, TableName) {
    if (!data.ID) {
      throw Error("No ID on the data");
    }
    const params = {
      TableName,
      Item: data,
    };
    const res = await documentClient.put(params).promise();
    if (!res) {
      throw Error(`There was an error inserting ID(date) of ${data.ID}`);
    }
    return data;
  },
};
module.exports = Dynamo;
