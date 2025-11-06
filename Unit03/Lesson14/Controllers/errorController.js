const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    console.error(error.stack);
    next(error);
};

// 404 Not Found
exports.pageNotFoundError = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND);
  res.render("error"); // renders error.ejs
};

// 500 Internal Server Error
exports.internalServerError = (err, req, res, next) => {
  console.error(`ERROR occurred: ${err.stack}`);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.send(`${StatusCodes.INTERNAL_SERVER_ERROR} | Sorry, our application is taking a nap!`);
};
