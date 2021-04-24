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

const { updateTicket, upvoteTicket, downvoteTicket } = require('./resolver');

const UpdateTicketMutation = mutationWithClientMutationId({
    name: 'UpdateTicketMutation',
    description: "Update a ticket in mutation",
    inputFields : {
        ticketId: { type: GraphQLString },
        key: { type: GraphQLString },
        value : { type: GraphQLString }
    },
    outputFields: {
        status : { type: GraphQLString },
        message: { type: GraphQLString }
    },
    mutateAndGetPayload: ({ ticketId, key, value }) => updateTicket( ticketId, key, value )
});

const UpvoteTicketMutation = mutationWithClientMutationId({
    name: 'UpvoteTicketMutation',
    description: "Upvote a ticket in mutation",
    inputFields : {
        ticketId: { type: GraphQLString },
    },
    outputFields: {
        status : { type: GraphQLString },
        message: { type: GraphQLString }
    },
    mutateAndGetPayload: ({ ticketId }) => upvoteTicket( ticketId )
});

const DownvoteTicketMutation = mutationWithClientMutationId({
    name: 'DownvoteTicketMutation',
    description: "Downvote a ticket in mutation",
    inputFields : {
        ticketId: { type: GraphQLString },
    },
    outputFields: {
        status : { type: GraphQLString },
        message: { type: GraphQLString }
    },
    mutateAndGetPayload: ({ ticketId }) => downvoteTicket( ticketId )
});


module.exports.UpdateTicketMutation = UpdateTicketMutation;
module.exports.UpvoteTicketMutation = UpvoteTicketMutation;
module.exports.DownvoteTicketMutation = DownvoteTicketMutation;