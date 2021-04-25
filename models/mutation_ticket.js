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

const { updateTicket, changeVoteCount, downvoteTicket, createTicket } = require('./resolver');

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

const ChangeVoteCountMutation = mutationWithClientMutationId({
    name: 'ChangeVoteCountMutation',
    description: "Change the Vote count of a ticket in mutation",
    inputFields : {
        ticketId: { type: GraphQLString },
		value: { type: GraphQLString },
    },
    outputFields: {
        status : { type: GraphQLString },
        message: { type: GraphQLString }
    },
    mutateAndGetPayload: (args) => changeVoteCount( args )
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
		subResourceType: {
			type: GraphQLString
		},
		otherInfo: {
			type: GraphQLString
		}
    },
    outputFields: {
        status : { type: GraphQLString },
        message: { type: GraphQLString }
    },
    mutateAndGetPayload: (args) => createTicket( args )
});



module.exports.UpdateTicketMutation = UpdateTicketMutation;
module.exports.ChangeVoteCountMutation = ChangeVoteCountMutation;
module.exports.DownvoteTicketMutation = DownvoteTicketMutation;
module.exports.CreateTicketMutation = CreateTicketMutation;