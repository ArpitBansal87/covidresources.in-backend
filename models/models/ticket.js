var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
      updatedAt: Number,
      ticketId: String,
      state: String,
      city: String,
      address: String,
      pincode: String,
      contactName: String,
      supplierDonorContactNumber: String,
      resourceType: String,
      resourceName: String,
      costPerUnit: String,
      availableUnits: String,
      upvoteCount: { type: Number, default: 0 },
      otherInfo: String,
      subResourceType: String,
      status: Number,   
});

module.exports.TicketModel = mongoose.model('TicketModel', TicketSchema );
