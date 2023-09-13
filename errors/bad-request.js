const CustomError = require('./custom-error');

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400; // Bad Request Error Status Code
  }
}

module.exports = BadRequestError