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

const { UpdateTicketMutation, UpvoteTicketMutation, DownvoteTicketMutation } = require('./models/mutation_ticket');

const GraphQLQueryRoot = new GraphQLObjectType({
	name: 'QueryRoot', 
	description: 'Every query must be made using the QueryRoot as the root',
	fields: {
		workspace: {
			type: (() => require('./models/node_workspace').GraphQLWorkspace)(),
			resolve: (source, args, context) => {
				console.log(args);
				return null
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
		updateTicket : UpdateTicketMutation 
	}
})

module.exports.Schema = new GraphQLSchema({
	query: GraphQLQueryRoot,
	mutation: GraphQLMutationRoot
});  
