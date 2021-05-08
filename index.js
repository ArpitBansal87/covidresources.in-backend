const serverless = require("serverless-http");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const { Schema } = require("./schema");
var bodyParser = require("body-parser");
const twitterClient = require("./models/utils/twitter_util");
const db = require("./models/utils/db");
const { TicketModel } = require("./models/models/ticket");

const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

const { updateTicket, getTickets } = require("./models/resolver");

app.get("/graphql", function(req, res) {
  graphqlHTTP({ schema: Schema, graphiql: true })(req, res);
});

app.post("/graphql", function(req, res) {
  graphqlHTTP({ schema: Schema })(req, res);
});

app.post("/freshdesk-twitter", jsonParser, async function(req, res) {
  try {
    const {
      cf_city,
      cf_state,
      cf_resource_type,
      cf_sub_resource_type,
      cf_other_info,
      cf_supplierdonor_contact_name,
      cf_supplierdonor_contact_number,
      cf_address,
    } = req.body;
    const dateValue = new Date();
    const tweetString = `✅ 𝐕𝐞𝐫𝐢𝐟𝐢𝐞𝐝
Location ${cf_city}
${cf_resource_type} ${cf_sub_resource_type} Available 
${cf_other_info} 

Name: ${cf_supplierdonor_contact_name}
Phone: ${cf_supplierdonor_contact_number}
Location: ${cf_address}
Last Verified @ ${dateValue.getDate()}/${Number(dateValue.getMonth()) + 1}/${dateValue.getFullYear()}, ${dateValue.getHours()}:${dateValue.getMinutes()} `;

    const response = await twitterClient.postTwitter(tweetString);
    console.log(response);
    res.send(`Tweet: ${tweetString}`);
  } catch (e) {
    console.log("Failed Twitter call up");
    console.log(e);
    res.send(`Error: ${e}`);
  }
});

app.post("/freshdesk-hook", async function(req, res) {
  try {
    console.log(req.body.custom_fields);
    const ticketId = req.body.id;
    const updatedAt = Date.now();
    const state = req.body.custom_fields.cf_state;
    const city = req.body.custom_fields.cf_city;
    const address = req.body.custom_fields.cf_address;
    const pincode = req.body.custom_fields.cf_pincode;
    const contactName = req.body.custom_fields.cf_fsm_contact_name;
    const supplierDonorContactNumber =
      req.body.custom_fields.cf_supplierdonor_contact_number;
    const resourceType = req.body.custom_fields.cf_resource_type;
    const costPerUnit = req.body.custom_fields.cf_cost_per_unit;
    const availableUnits = req.body.custom_fields.cf_available_units;
    const otherInfo = req.body.custom_fields.cf_other_info;
    const subResourceType = req.body.custom_fields.cf_sub_resource_type;
    let status = 2;
    switch (req.body.custom_fields.cf_status) {
      case "Open":
        status = 2;
        break;
      case "Pending":
      case "Needs Re-verification":
        status = 3;
        break;
      case "Resolved":
      case "Verified":
        status = 4;
        break;
      case "Closed":
      case "Expired Resource":
        status = 5;
        break;
      case "On-hold":
        status = 6;
        break;
    }
    //JSON.parse(req.body.triggered_event).status.to;
    /*return res.send(await (new TicketModel({
      updatedAt, state, city, address, pincode, contactName, supplierDonorContactNumber, 
      resourceType, costPerUnit, availableUnits, otherInfo, subResourceType, status 
    })).save())*/
    const uploadData = {
      updatedAt,
      state,
      city,
      address,
      pincode,
      contactName,
      supplierDonorContactNumber,
      resourceType,
      costPerUnit,
      availableUnits,
      otherInfo,
      subResourceType,
      status,
    };
    await updateTicket(ticketId, uploadData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send("ok");
  } catch (e) {
    console.log(e);
    //todo: returning 200 inspite of error to avoid re-try from freshdesk in order to reduce QPS
    res.send(JSON.stringify(e));
  }
});

app.get("/test-tickets", async function(req, res) {
  res.send(await getTickets(req.query));
});

module.exports.handler = serverless(app);
