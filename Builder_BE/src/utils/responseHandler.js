/* ====================================
            Response Handler
   ==================================== */
const sendSuccess = (res, statusCode, message, data = null, meta = null) => {
  const response = {
    success: true,
    code: statusCode,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).send(response);
};

const sendError = (res, statusCode, message, error = null) => {
  return res.status(statusCode).send({
    success: false,
    code: statusCode,
    message,
    error,
  });
};

const responseHandler = (req, res, next) => {
  res.success = ({
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
  } = {}) => {
    return sendSuccess(res, statusCode, message, data, meta);
  };

  res.error = ({
    statusCode = 500,
    message = "Internal server error",
    error = null,
  } = {}) => {
    return sendError(res, statusCode, message, error);
  };

  res.ok = (message = "Success", data = null, meta = null) => {
    return sendSuccess(res, 200, message, data, meta);
  };

  res.found = (message = "Data found successfully", data = null, meta = null) => {
    return sendSuccess(res, 200, message, data, meta);
  };

  res.created = (message = "Created successfully", data = null) => {
    return sendSuccess(res, 201, message, data);
  };

  res.updated = (message = "Updated successfully", data = null) => {
    return sendSuccess(res, 200, message, data);
  };

  res.deleted = (message = "Deleted successfully", data = null) => {
    return sendSuccess(res, 200, message, data);
  };

  res.noContent = () => {
    return res.status(204).send();
  };

  res.badRequest = (message = "Bad request", error = null) => {
    return sendError(res, 400, message, error);
  };

  res.unauthorized = (message = "Unauthorized access", error = null) => {
    return sendError(res, 401, message, error);
  };

  res.paymentRequired = (message = "Payment required", error = null) => {
    return sendError(res, 402, message, error);
  };

  res.forbidden = (message = "Forbidden access", error = null) => {
    return sendError(res, 403, message, error);
  };

  res.notFound = (message = "Data not found", error = null) => {
    return sendError(res, 404, message, error);
  };

  res.methodNotAllowed = (message = "Method not allowed", error = null) => {
    return sendError(res, 405, message, error);
  };

  res.conflict = (message = "Conflict", error = null) => {
    return sendError(res, 409, message, error);
  };

  res.unprocessableEntity = (message = "Validation failed", error = null) => {
    return sendError(res, 422, message, error);
  };

  res.tooManyRequests = (message = "Too many requests", error = null) => {
    return sendError(res, 429, message, error);
  };

  res.serverError = (message = "Internal server error", error = null) => {
    return sendError(res, 500, message, error);
  };

  res.notImplemented = (message = "Not implemented", error = null) => {
    return sendError(res, 501, message, error);
  };

  res.badGateway = (message = "Bad gateway", error = null) => {
    return sendError(res, 502, message, error);
  };

  res.serviceUnavailable = (message = "Service unavailable", error = null) => {
    return sendError(res, 503, message, error);
  };

  next();
};

module.exports = responseHandler;
