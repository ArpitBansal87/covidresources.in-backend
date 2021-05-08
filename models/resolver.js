const { URL, PATH } = require("./utils/constants");
const {
  makeRequest,
  convertToResponseFormat,
  getTicketsURL,
} = require("./utils/utils");
const { TicketModel } = require("./models/ticket");

module.exports.getTickets = async function(filter) {
  try {
    const { state, city, resourceType } = filter;
    const filterObj = filter
      ? {
          ...(state && { state }),
          ...(city && { city }),
          ...(resourceType && { resourceType }),
          status: 4,
        }
      : { status: 4 };
    const docs = TicketModel.find(filterObj)
    .sort({ updatedAt: -1 })
    .exec();
    return docs;
  } catch (e) {
    return [];
  }

  //TODO: Please let @madhavanmalolan know what schema you want to respond with. For now only added ticketId, title and upvotes
};

module.exports.getWorkspace = async function() {
  return {
    workspaceId: "singleton-workspace-covidresources",
  };
};

module.exports.updateTicket = async function(ticketId, ticketObj) {
  await TicketModel.findOneAndUpdate({ ticketId }, ticketObj, { upsert: true });
  return { status: "200", message: "OK" };
};

module.exports.upvoteTicket = async function(ticketId) {
  try {
    const filter = { ticketId };
    const updateValue = { $inc: { upvoteCount: 1 } };
    const response = await TicketModel.updateOne(filter, updateValue).exec();
  } catch (e) {
    return { status: "500", message: `Internal server Err ${e}` };
  }
  return { status: "200", message: `OK` };
};

module.exports.downvoteTicket = async function(ticketId) {
  try {
    const filter = { ticketId: ticketId };
    const updateValue = { $inc: { upvoteCount: -1 } };
    await TicketModel.updateOne(filter, updateValue).exec();
  } catch (e) {
    return { status: "500", message: `Internal server Err ${e}` };
  }
  return { status: "200", message: `OK` };
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
    secretKey,
  } = args;
  try {
    let createFields = {
      email: "covidresourcesdotin@gmail.com",
      status: 2,
      subject: `${resourceType} in ${city}, ${state}`,
      description: `<div>State: ${state}, <br> City: ${city} <br> Resource: ${resourceType} <br> Sub Resource: ${subResourceType} <br> Contact Name: ${supplierDonorName} <br> Contact Number: ${supplierDonorContactNumber} <br> Other Info: ${otherInfo}</div>`,
      custom_fields: {
        cf_state: state,
        cf_city: city,
        cf_resource_type: resourceType,
        cf_sub_resource_type: subResourceType,
        cf_upvote_count: "0",
        cf_address: address,
        cf_supplierdonor_name: supplierDonorName,
        cf_supplierdonor_contact_number: supplierDonorContactNumber,
        cf_cost_per_unit: costPerUnit,
        cf_available_units: availableUnits,
        cf_other_info: otherInfo,
      },
    };
    // verified: 4, Open: 2, Pending/re-verified: 3, Closed/Dead: 5
    if (secretKey !== undefined && secretKey === "KJlbvTHqK1Khi6mmNGC") {
      createFields.status = 4;
    } else if(secretKey && secretKey !== "KJlbvTHqK1Khi6mmNGC" && secretKey.length !== 0) {
      console.log('Incorrect secret key passed');
      return { status: "500", message:"Incorrect secret key passed"};
    }
    const urlString = `${URL}${PATH}`;
    const response = await makeRequest("POST", urlString, createFields);
    if (response.isAxiosError) {
      const errorObj = response.isAxiosError.response;
      console.error(errorObj.data.errors);
      return { status: "500", message: errorObj.data.description };
    }
    console.log(createFields);
    // await TicketModel.create(createFields).then(function(err, results) {
    //   console.log("inside the response obj");      
    // });
    return { status: "200", message: "OK" };
  } catch (e) {
    console.log(e);
    return { status: "500", message: "Internal server error" };
  }
};
