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

const { TicketsConnection } = require('./connection_tickets');
const { getTickets } = require('./resolver')


const GraphQLWorkspace = new GraphQLObjectType({
	name: 'Workspace',
	description: 'The workspace for all Ops',
	fields: {
		id: globalIdField(),
		workspaceId: { 
			type: GraphQLString,
		},
		tickets: {
			type: TicketsConnection, 
			description: "Tickets fetched from Freshdesk",
			args: {
				state: { type: GraphQLString},
				city: { type: GraphQLString},
				resourceType: { type: GraphQLString},
				...connectionArgs
			}, 
			resolve: (source, { state, city, resourceType, ...args } ) => {
				return connectionFromPromisedArray(getTickets({state, city, resourceType}), args);
			}
		}
	}
})

module.exports.GraphQLWorkspace = GraphQLWorkspace
