export const getError = (error) => {
  // if theres an error and an error message send the error data message. else send normal error message
  return error.response && error.response.data.message ? error.response.data.message : error.message;
};
