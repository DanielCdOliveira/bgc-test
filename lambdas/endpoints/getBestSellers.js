const Responses = require("../commom/API_Responses.js");
const Dynamo = require("../commom/Dynamo.js");
const tableName = process.env.tableName;
module.exports.handler = async (event) => {
  const date = event.pathParameters.date;
  const bestsellers = await Dynamo.get(date, tableName).catch((err) => {
    console.log("DYNAMO_ERROR", err);
    return null;
  });
  if (!bestsellers) {
    return Responses._404({ message: "date not registered" });
  }
  return Responses._200(bestsellers);
};
