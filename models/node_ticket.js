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



const GraphQLTicket = new GraphQLObjectType({
	name: 'Ticket',
	description: 'Ticket',
	fields: {
		ticketId: {
			GraphQLString,
		},
		title : {
			type: GraphQLString,
		},
		upvotes: { 
			type: GraphQLInt
		},
	}
})

module.exports.GraphQLTicket = GraphQLTicket
