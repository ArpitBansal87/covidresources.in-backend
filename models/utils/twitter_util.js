const Twitter = require("twitter");
const dotenv = require("dotenv");

dotenv.config();

var twitterClient = Twitter({
  consumer_key: process.env.apiKey,
  consumer_secret: process.env.apiSecretKey,
  access_token_key: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret,
});

module.exports.postTwitter = function(post) {
  return twitterClient.post("statuses/update", { status: post });
};
