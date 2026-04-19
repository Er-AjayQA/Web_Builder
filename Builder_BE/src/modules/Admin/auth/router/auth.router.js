const AuthController = require("../controller/auth.controller");

module.exports = (app) => {
  app.post("/api/v1/auth/user_registration", AuthController.user_registration);
  app.post("/api/v1/auth/verify_otp", AuthController.verify_otp);
};
