/* ====================================
            Imports
   ==================================== */
const { max } = require("moment/moment");
const dbConfig = require("./db.config");
const Sequelize = require("sequelize");

/* ====================================
            DB Configuration
   ==================================== */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.accquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* ====================================
            Define Models
   ==================================== */
db.UsersModel = require("../modules/Admin/users/model/users.model")(
  sequelize,
  Sequelize,
);
db.OtpsModel = require("../modules/Admin/auth/model/otps.model")(
  sequelize,
  Sequelize,
);
db.TenantsModel = require("../modules/Admin/tenants/model/tenants.model")(
  sequelize,
  Sequelize,
);
db.WebsitesModel = require("../modules/Admin/websites/model/websites.model")(
  sequelize,
  Sequelize,
);
db.ThemesModel = require("../modules/Admin/themes/model/themes.model")(
  sequelize,
  Sequelize,
);
db.PagesModel = require("../modules/Admin/pages/model/pages.model")(
  sequelize,
  Sequelize,
);
db.PageSectionsModel =
  require("../modules/Admin/page_sections/model/page_sections.model")(
    sequelize,
    Sequelize,
  );

/* ====================================
            Create Associations
   ==================================== */
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

/* ====================================
            Export DB
   ==================================== */
module.exports = db;
