const { default: axios } = require("axios");
const { auth, URL } = require("./constants");
module.exports.makeRequest = async (method, url) => {
  const options = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  };
  let responseObj = {};
  try {
    responseObj = await axios(options);
  } catch (err) {
    responseObj = { isAxiosError: err };
  }
  return responseObj;
};
