class ApiError extends Error {
  statusCode: number;
  errors: any;

  constructor(
    statusCode: number,
    message = "Internal Server Error",
    errors: any = null,
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
