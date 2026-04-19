/* ====================================
            Global Error Handler
   ==================================== */
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";

  console.error("API Error:", err);

  return res.error({
    statusCode,
    message,
    error: process.env.NODE_ENV === "production" ? null : err,
  });
};

module.exports = errorMiddleware;
