// success response
const successResponse = (res, message = "Success", data = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

// created response
const createResponse = (res, message = "Created successfully", data = {}) => {
  return res.status(201).json({
    success: true,
    message,
    data
  });
};

// updated response
const updateResponse = (res, message = "Updated successfully", data = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

// deleted response
const deleteResponse = (res, message = "Deleted successfully") => {
  return res.status(200).json({
    success: true,
    message
  });
};

// all fields required
const allFieldsResponse = (res, message = "All fields are required") => {
  return res.status(400).json({
    success: false,
    message
  });
};

// not found
const notFound_Response = (res, message = "Resource not found") => {
  return res.status(404).json({
    success: false,
    message
  });
};


// not found
const already_ExistResponse = (res, message = "Data already exists") => {
  return res.status(409).json({
    success: false,
    message
  });
};

// server error
const serverError_Response = (res, error) => {
  console.error(error); // log internally
  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};


//send response for opt verification
const otpVerificationResponse = (res, message = "OTP verified successfully", success = true) => {
  return res.status(200).json({
    success,
    message
  });
}

module.exports = {
  successResponse,
  serverError_Response,
  already_ExistResponse,
  notFound_Response,
  allFieldsResponse,
  updateResponse,
  deleteResponse,
  createResponse,
  otpVerificationResponse
};
