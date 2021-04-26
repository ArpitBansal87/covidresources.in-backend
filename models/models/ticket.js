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
      resourceType: Number,
      resourceName: String,
      costPerUnit: String,
      availableUnits: Number,
      upvoteCount: Number,
      otherInfo: String,
      subResourceType: String,
});

module.exports.TicketModel = mongoose.model('TicketModel', TicketSchema );
