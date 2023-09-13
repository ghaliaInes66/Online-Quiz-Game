const CustomError = require('./custom-error');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthenticated');

module.exports = {
  CustomError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError
}