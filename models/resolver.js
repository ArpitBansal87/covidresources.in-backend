const axios = require('axios')
async function getTickets(source, args, context) {
    return [{
        ticketId: "Sample Ticket Id",
        createdAt : "2021-04-23T18:38:58Z",
        state: "Maharashtra",
        city: "Mumbai",
        pincode: "4000097",
        address: "Malad East",
        supplierDonorName: "Smit Shah",
        supplierDonorContactNumber : "8097117927",
        resourceType: "Medicines",
        resourceName: "Remdesivir",
        costPerUnit: "100",
        availableUnits: "100"
    }]
    //TODO: Please let @madhavanmalolan know what schema you want to respond with. For now only added ticketId, title and upvotes
}


module.exports.getWorkspace = async function() {
    return {
        workspaceId: "singleton-workspace-covidresources",
    }
}

module.exports.updateTicket = async function(ticketId, key, value) {
    console.log("updateTicket", ticketId, key, value)
    return { status: "200", message: "OK" }
}

module.exports.upvoteTicket = function(ticketId) {
    console.log("upvoteTicket", ticketId)
    return { status: "200", message: "OK" }
}

module.exports.downvoteTicket = async function(ticketId) {
    console.log("downvoteTicket", ticketId)
    return { status: "200", message: "OK" }
}
module.exports.getTickets = getTickets