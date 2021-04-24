const API_KEY = "KJlbvTHqK1Khi6mmNGC";
const FD_ENDPOINT = "newaccount1619191377885";
const PATH = "/api/v2/tickets";
const URL = "https://" + FD_ENDPOINT + ".freshdesk.comv" + PATH;
const auth = "Basic " + new Buffer.from(`${API_KEY}:Xv`).toString("base64");

module.exports = { URL, auth };
