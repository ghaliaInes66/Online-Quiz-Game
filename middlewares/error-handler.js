

const errorHandler = (err, req, res, next) => {
  let customError = {
    status: err.statusCode || 500,
    message : err.message || 'Somthing went wrong in the server!'
  }

  if(err.name === 'ValidationError') {
    customError.status = 400;
    customError.message = `${Object.keys(err.keyValue)[0]} '${Object.values(err.keyValue)[0]}' already exist!`;
  }

  if(err.code === 11000) {
    customError.status = 400;
    customError.message= `Please provide valid ${Object.keys(err.errors)
    .map(field => field).join(', ')}!`;
  }

  if(err.name === 'CastError') {
    customError.status = 400;
    customError.message = 'ID syntax is not correct: Provide a valid ID please!';
  }

  res.status(customError.status)
  .json({ success: false, message: customError.message });
}

module.exports = errorHandler