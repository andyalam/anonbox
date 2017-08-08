/*
	A quick shortcut for sending json data / an HTTP status more easily
*/
exports.sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to Angular
*/
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
