const { default: axios } = require("axios");
const { auth, URL, PATH, FILTER_PATH } = require("./constants");

module.exports.makeRequest = async (method, url) => {
  const options = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
  };
  let responseObj = {};
  try {
    responseObj = await axios(options);
  } catch (err) {
    responseObj = { isAxiosError: err };
  }
  return responseObj;
};

module.exports.convertToResponseFormat = (data) => {
  return data.map((ele) => {
    return {
      updatedAt: ele.updated_at,
      ticketId: ele.id,
      state: ele.custom_fields.cf_state,
      city: ele.custom_fields.cf_city,
      address: ele.custom_fields.cf_address,
      pincode: ele.custom_fields.cf_pincode,
      contactName: ele.custom_fields.cf_supplierdonor_name,
      supplierDonorContactNumber:
        ele.custom_fields.cf_supplierdonor_contact_number,
      resourceType: ele.custom_fields.cf_resource_type,
      resourceName: ele.custom_fields.cf_resource_name,
      costPerUnit: ele.custom_fields.cf_cost_per_unit,
      availableUnits: ele.custom_fields.cf_available_units,
      upvoteCount: ele.custom_fields.cf_upvote_count,
      otherInfo: ele.custom_fields.cf_other_info,
      subResourceType: ele.custom_fields.cf_sub_resource_type,
    };
  });
};

module.exports.getTicketsURL = (filter) => {
  if (filter) {
    return `${URL}${FILTER_PATH} AND ${filter}"`;
  }
  return `${URL}${FILTER_PATH}"`;
};
