//@Desc
export default class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    // this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOprational = true;
  }
}
