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
		id: globalIdField(),
		ticketId: {
			type: GraphQLString,
		},
		updatedAt : {
			type: GraphQLString,
		},
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
		contactName: {
			type: GraphQLString
		},
		upvoteCount: {
			type: GraphQLInt
		},
		otherInfo: {
			type: GraphQLString
		},
		subResourceType: {
			type: GraphQLString
		}
	}
})

module.exports.GraphQLTicket = GraphQLTicket
