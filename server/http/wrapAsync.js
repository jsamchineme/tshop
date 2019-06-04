
const wrapAsync = (fn) => {
  const errorHandler = (req, res, next) => {
    // middleware for catching errors and passing them to next()
    fn(req, res, next).catch(next);
  };
  return errorHandler;
};

export default wrapAsync;
