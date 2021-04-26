const { URL, PATH } = require("./utils/constants");
const {
  makeRequest,
  convertToResponseFormat,
  getTicketsURL,
} = require("./utils/utils");
const {TicketModel} = require('./models/ticket')


module.exports.getTickets = async function(filter) {
  try {
    const urlString = getTicketsURL(filter);
    const response = await makeRequest("GET", urlString);
    const { data, isAxiosError } = response;
    if (!isAxiosError) {
      return convertToResponseFormat(data.results);
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }

  //TODO: Please let @madhavanmalolan know what schema you want to respond with. For now only added ticketId, title and upvotes
};

/*async function getTickets(source, args, context) {
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
*/

module.exports.getWorkspace = async function() {
  return {
    workspaceId: "singleton-workspace-covidresources",
  };
};

module.exports.updateTicket = async function(ticketId, key, value) {
  console.log("updateTicket", ticketId, key, value);
  return { status: "200", message: "OK" };
};

module.exports.changeVoteCount = async function(args) {
  const { ticketId, value } = args;
  let returnObj = {};
  try {
    const urlString = `${URL}${PATH}/${ticketId}`;
    const response = await makeRequest("PUT", urlString, {
      custom_fields: {
        cf_upvote_count: String(value),
      },
    });
    returnObj = { status: "200", message: "OK" };
  } catch (e) {
    console.log(e);
    returnObj = {
      status: "500",
      message: "Internal server error",
    };
  }
  return returnObj;
};

module.exports.downvoteTicket = async function(ticketId) {
  console.log("downvoteTicket", ticketId);
  return { status: "200", message: "OK" };
};

module.exports.createTicket = async function(args) {
  const {
    state,
    city,
    pincode,
    address,
    supplierDonorName,
    supplierDonorContactNumber,
    resourceType,
    subResourceType,
    resourceName,
    costPerUnit,
    availableUnits,
    otherInfo,
  } = args;
  try {
    let createFields = {
      phone: supplierDonorContactNumber,
      name: supplierDonorName,
      status: 2,
      subject: `${resourceType} ${city}`,
      description: `<div>State: ${state}, <br> City: ${city} <br> Resource: ${resourceType} <br> Sub Resource: ${subResourceType} <br> Contact Name: ${supplierDonorName} <br> Contact Number: ${supplierDonorContactNumber} </div>`,
      custom_fields: {
        cf_state: state,
        cf_city: city,
        cf_resource_type: resourceType,
        cf_sub_resource_type: subResourceType,
        cf_upvote_count: "0",
        cf_address: address,
        cf_pincode: Number(pincode),
        cf_supplierdonor_name: supplierDonorName,
        cf_supplierdonor_contact_number: supplierDonorContactNumber,
        cf_cost_per_unit: costPerUnit,
        cf_available_units: availableUnits,
        cf_other_info: otherInfo,
      },
    };
    const urlString = `${URL}${PATH}`;
    const response = await makeRequest("POST", urlString, createFields);
    if (response.isAxiosError) {
      const errorObj = response.isAxiosError.response;
      console.error(errorObj.data.errors);
      return { status: "500", message: errorObj.data.description };
    }
    return { status: "200", message: "OK" };
  } catch (e) {
    console.log(e);
    return { status: "500", message: "Internal server error" };
  }
};
