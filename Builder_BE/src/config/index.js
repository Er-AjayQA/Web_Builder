/* ====================================
            Imports
   ==================================== */
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
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* ====================================
            Define Models
   ==================================== */
db.UsersModel = require("../../models/users.model")(sequelize, Sequelize);
db.OtpsModel = require("../../models/otps.model")(sequelize, Sequelize);
db.TenantsModel = require("../../models/tenants.model")(sequelize, Sequelize);
db.WebsitesModel = require("../../models/websites.model")(sequelize, Sequelize);
db.ThemesModel = require("../../models/themes.model")(sequelize, Sequelize);
db.PagesModel = require("../../models/pages.model")(sequelize, Sequelize);
db.PageSectionsModel = require("../../models/page_sections.model")(
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
