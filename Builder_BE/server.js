/* ====================================
            Imports
   ==================================== */
require("dotenv").config({ quiet: true });
const app = require("./app");
const db = require("./src/config/index");
const PORT = process.env.PORT;

/* ====================================
            Check DB Connections
   ==================================== */
db.sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Server is running at port ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });
