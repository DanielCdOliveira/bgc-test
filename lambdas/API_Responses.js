const Responses = {
  _200(data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Methods": "*",
        "Acess-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
};
module.exports = Responses;
