const serverless = require('serverless-http');
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const { Schema } = require('./schema');
var bodyParser = require('body-parser');
//const db = require('./models/utils/db');

const cors = require('cors')
app.use(cors());
app.use(bodyParser.json())


const { updateTicket, getTickets } = require('./models/resolver');


app.get('/graphql', function (req, res) {
  graphqlHTTP({ schema: Schema, graphiql: true })(req, res)
})

app.post('/graphql', function (req, res) {
  graphqlHTTP({ schema: Schema, })(req, res)
})

app.post('/freshdesk-hook', async function(req, res) {
  try {
    const ticketId = req.body.id;
    const updatedAt= Date.now();
    const state = req.body.custom_fields.cf_state;
    const city = req.body.custom_fields.cf_city;
    const address = req.body.custom_fields.cf_address;
    const pincode = req.body.custom_fields.cf_pincode;
    const contactName = req.body.custom_fields.cf_fsm_contact_name;
    const supplierDonorContactNumber= req.body.custom_fields.cf_supplierdonor_contact_number;
    const resourceType = req.body.custom_fields.cf_resource_type;
    const costPerUnit = req.body.custom_fields.cf_cost_per_unit;
    const availableUnits = req.body.custom_fields.cf_available_units;
    const otherInfo = req.body.custom_fields.cf_other_info;
    const subResourceType = req.body.custom_fields.cf_sub_resource_type;
    const status = req.body.triggered_event.match(/to:(\d+)/)[1];//JSON.parse(req.body.triggered_event).status.to;
    await updateTicket(ticketId, { 
      updatedAt, state, city, address, pincode, contactName, supplierDonorContactNumber, 
      resourceType, costPerUnit, availableUnits, otherInfo, subResourceType, status 
    });
    res.send("ok");
  }
  catch(e){
    console.log(e)
    //todo: returning 200 inspite of error to avoid re-try from freshdesk in order to reduce QPS
    res.send(JSON.stringify(e));
  }
});

app.get('/test-tickets', async function (req, res) {
  res.send(await getTickets(req.query));
})

module.exports.handler = serverless(app);
