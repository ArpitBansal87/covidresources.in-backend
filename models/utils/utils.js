const { default: axios } = require("axios");
const { auth, URL } = require("./constants");

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
      createdAt: ele.created_at,
      ticketId: ele.id,
      state: ele.custom_fields.cf_state958287,
      city: ele.custom_fields.cf_city264184,
      pincode: ele.custom_fields.cf_pincode,
      address: ele.custom_fields.cf_address,
      supplierDonorName: ele.custom_fields.cf_supplierdonor_name,
      supplierDonorContactNumber:
        ele.custom_fields.cf_supplierdonor_contact_number,
      resourceType: ele.custom_fields.cf_resource_type524459,
      resourceName: ele.custom_fields.cf_resource_name,
      costPerUnit: ele.custom_fields.cf_cost_per_unit,
      availableUnits: ele.custom_fields.cf_available_units,
    };
  });
};
