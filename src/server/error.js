class ServerError extends Error {
  constructor(message, statusCode = 500) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class AuthenticationError extends Error {
  constructor(message, statusCode = 401) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class InvalidParameterError extends Error {
  constructor(param, statusCode = 500) {
    super();
    this.message = `Invalid Parameter: ${param}`;
    this.statusCode = statusCode;
  }
}

module.exports = {
  ServerError,
  AuthenticationError,
  InvalidParameterError,
};