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
  _404(data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Methods": "*",
        "Acess-Control-Allow-Origin": "*",
      },
      statusCode: 404,
      body: JSON.stringify(data),
    };
  },
  _400(data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Methods": "*",
        "Acess-Control-Allow-Origin": "*",
      },
      statusCode: 400,
      body: JSON.stringify(data),
    };
  },
  _422(data = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Methods": "*",
        "Acess-Control-Allow-Origin": "*",
      },
      statusCode: 422,
      body: JSON.stringify(data),
    };
  },
};
module.exports = Responses;
