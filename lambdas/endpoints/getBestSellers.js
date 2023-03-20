const Responses = require("../commom/API_Responses.js");
const Dynamo = require("../commom/Dynamo.js");
const tableName = process.env.tableName;
const regexDate = /^((0\d|1[0-2])-[0-2]\d|3[01])-[0-2]\d{3}$/;
module.exports.handler = async (event) => {
  const date = event.pathParameters.date;
  if (!regexDate.test(date)) {
    return Responses._422({ message: "invalid date format" });
  }
  const bestsellers = await Dynamo.get(date, tableName).catch((err) => {
    console.log("DYNAMO_ERROR", err);
    return null;
  });
  if (!bestsellers) {
    return Responses._404({ message: "date not registered" });
  }
  return Responses._200(bestsellers);
};
