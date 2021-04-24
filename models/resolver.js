module.exports.getTickets = async function() {
    console.log("getTickets")
    return []
}

module.exports.updateTicket = async function(ticketId, key, value) {
    console.log("updateTicket", ticketId, key, value)
    return { status: "200", message: "OK" }
}

module.exports.upvoteTicket = async function(ticketId) {
    console.log("upvoteTicket", ticketId)
    return { status: "200", message: "OK" }
}

module.exports.downvoteTicket = async function(ticketId) {
    console.log("downvoteTicket", ticketId)
    return { status: "200", message: "OK" }
}
