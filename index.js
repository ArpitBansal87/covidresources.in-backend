const serverless = require('serverless-http');
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const { Schema } = require('./schema');
var bodyParser = require('body-parser')

app.use(bodyParser.json())


app.get('/graphql', function (req, res) {
  graphqlHTTP({ schema: Schema, graphiql: true })(req, res)
})

app.post('/graphql', function (req, res) {
  graphqlHTTP({ schema: Schema, })(req, res)
})

module.exports.handler = serverless(app);
