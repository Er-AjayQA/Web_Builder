const { v4: uuidv4 } = require("uuid");
const { passwordEncryption } = require("../utils/passwordEncryption");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existing = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'superadmin@gmail.com' LIMIT 1;`,
    );

    if (!existing[0].length) {
      const password = await passwordEncryption("Admin@123");

      await queryInterface.bulkInsert("users", [
        {
          id: uuidv4(),
          name: "Super Admin",
          email: "superadmin@gmail.com",
          password: password,
          role: "super_admin",
          status: "ACTIVE",
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", {
      email: "superadmin@gmail.com",
    });
  },
};
