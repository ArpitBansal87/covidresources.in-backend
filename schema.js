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

const { UpdateTicketMutation, UpvoteTicketMutation, DownvoteTicketMutation ,CreateTicketMutation } = require('./models/mutation_ticket');
const { GraphQLWorkspace } = require('./models/node_workspace');
const { getWorkspace } = require('./models/resolver');

const GraphQLQueryRoot = new GraphQLObjectType({
	name: 'QueryRoot', 
	description: 'Every query must be made using the QueryRoot as the root',
	fields: {
		workspace: {
			type: GraphQLWorkspace,
			resolve: (source, args, context) => {
				return getWorkspace();
			}
		}
	}
});


const GraphQLMutationRoot = new GraphQLObjectType({
	name: 'MutationRoot', 
	description: 'Every mutation must be made with MutationRoot as the root',
	fields: {
		upvoteTicket : UpvoteTicketMutation,
		downvoteTicket : DownvoteTicketMutation,
		updateTicket : UpdateTicketMutation,
		createTicket : CreateTicketMutation
	}
})

module.exports.Schema = new GraphQLSchema({
	query: GraphQLQueryRoot,
	mutation: GraphQLMutationRoot
});  
