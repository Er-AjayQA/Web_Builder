/* ====================================
            Not Found Handler
   ==================================== */
const notFoundMiddleware = (req, res) => {
  return res.notFound(`Route not found: ${req.originalUrl}`);
};

module.exports = notFoundMiddleware;
