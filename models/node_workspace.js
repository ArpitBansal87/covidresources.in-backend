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
		connectionFromPromisedArray,
		cursorForObjectInConnection,
		fromGlobalId,
		globalIdField,
		mutationWithClientMutationId,
		nodeDefinitions,
		toGlobalId,
} =require('graphql-relay');

const {TicketsConnection} = require('./connection_tickets');
const { getTickets } = require('./resolver')


const GraphQLWorkspace = new GraphQLObjectType({
	name: 'Workspace',
	description: 'The workspace for all Ops',
	fields: {
		workspaceId: { 
			type: GraphQLString,
		},
		tickets: {
			type: TicketsConnection, 
			description: "Tickets fetched from Freshdesk",
			args: {
				...connectionArgs
			}, 
			resolve: (source, { args }, context) => connectionFromPromisedArray(getTickets())
		}
	}
})

module.exports.GraphQLWorkspace = GraphQLWorkspace
