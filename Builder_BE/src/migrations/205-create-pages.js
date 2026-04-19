module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pages", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      order_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      website_id: {
        type: Sequelize.UUID,
        references: {
          model: "websites",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      page_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      seo_title: {
        type: Sequelize.STRING,
      },
      seo_description: {
        type: Sequelize.STRING,
      },
      content_json: {
        type: Sequelize.JSON,
      },
      published_content_json: {
        type: Sequelize.JSON,
      },
      is_homepage: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addConstraint("pages", {
      fields: ["website_id", "slug"],
      type: "unique",
      name: "unique_slug_per_website",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("pages", "unique_slug_per_website");
    await queryInterface.dropTable("pages");
  },
};
