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

const { updateTicket, upvoteTicket, downvoteTicket, createTicket } = require('./resolver');

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

const CreateTicketMutation = mutationWithClientMutationId({
    name: 'CreateTicketMutation',
    description: "Create a ticket mutation",
    inputFields : {
        state: { 
			type: GraphQLString
		},
		city: { 
			type: GraphQLString
		},
		pincode: { 
			type: GraphQLString
		},
		address: { 
			type: GraphQLString
		},
		supplierDonorName: { 
			type: GraphQLString
		},
		supplierDonorContactNumber: { 
			type: GraphQLString
		},
		resourceType: { 
			type: GraphQLString
		},
		resourceName: { 
			type: GraphQLString
		},
		costPerUnit: { 
			type: GraphQLString
		},
		availableUnits: { 
			type: GraphQLString
		},
		bloodGroup: { 
			type: GraphQLString
		},
    },
    outputFields: {
        status : { type: GraphQLString },
        message: { type: GraphQLString }
    },
    mutateAndGetPayload: (source, args, context) => createTicket( source, args, context )
});



module.exports.UpdateTicketMutation = UpdateTicketMutation;
module.exports.UpvoteTicketMutation = UpvoteTicketMutation;
module.exports.DownvoteTicketMutation = DownvoteTicketMutation;
module.exports.CreateTicketMutation = CreateTicketMutation;