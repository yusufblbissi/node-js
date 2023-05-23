const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || `error`;

  if (process.env.NODE_ENV == "development") {
    SendErrorForDev(err, res);
  } else {
    SendErrorForProduction(err, res);
  }
};
const SendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status, //error status
    error: err, // error
    message: err.message, // error massege
    stack: err.stack, //where is error
  });
};
const SendErrorForProduction = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status, //error status
    message: err.message, // error message
  });
};
export default globalError;
