/* ====================================
            App Setup
   ==================================== */
const express = require("express");
const cors = require("cors");
const responseHandler = require("./src/utils/responseHandler");
const notFoundMiddleware = require("./src/middlewares/notFound.middleware");
const errorMiddleware = require("./src/middlewares/error.middleware");
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(responseHandler);
app.use(
  cors({
    origin: "",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Audit",
      "x-tenant-domain",
    ],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  return res.ok("Welcome to WebBuilder Application.");
});

/* ====================================
            Routes
   ==================================== */
require("./src/modules/Admin/auth/router/auth.router.js")(app);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
