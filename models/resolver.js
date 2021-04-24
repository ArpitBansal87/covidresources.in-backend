const { default: axios } = require("axios");
const { auth, URL } = require("./utils/constants");

module.exports.getTickets = async function() {
  console.log("getTickets");
  axios({
    method: "GET",
    url: URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  })
    .then((response) => {
      const { data, isAxiosError, status, code } = response;
      if (!isAxiosError) {
        return { status, data };
      } else {
        return {
          status: "500",
          error: code,
        };
      }
    })
    .catch((err) => {
      return { status: "500", message: err };
    });

  //TODO: Please let @madhavanmalolan know what schema you want to respond with. For now only added ticketId, title and upvotes
};

module.exports.updateTicket = async function(ticketId, key, value) {
  console.log("updateTicket", ticketId, key, value);
  return { status: "200", message: "OK" };
};

module.exports.upvoteTicket = async function(ticketId) {
  console.log("upvoteTicket", ticketId);
  return { status: "200", message: "OK" };
};

module.exports.downvoteTicket = async function(ticketId) {
  console.log("downvoteTicket", ticketId);
  return { status: "200", message: "OK" };
};
