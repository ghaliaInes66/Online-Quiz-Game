const CustomError = require('./custom-error');

class UauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.name = 'UauthorizedError';
    this.statusCode = 401; // Unauthorized Error Status Code
  }
}

module.exports = UauthorizedError