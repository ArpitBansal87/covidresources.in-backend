const {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} = require('graphql');
const {
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	cursorForObjectInConnection,
	fromGlobalId,
	globalIdField,
	mutationWithClientMutationId,
	nodeDefinitions,
	toGlobalId,
} =require('graphql-relay');

const { GraphQLTicket } = require('./node_ticket');

const {
	connectionType: TicketsConnection,
	edgeType: TicketsEdge,
  } = connectionDefinitions({ nodeType: GraphQLTicket });

module.exports.TicketsConnection = TicketsConnection;
module.exports.TicketsEdge = TicketsEdge;
