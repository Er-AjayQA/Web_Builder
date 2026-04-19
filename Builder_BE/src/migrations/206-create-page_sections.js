module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("page_sections", {
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
      page_id: {
        type: Sequelize.UUID,
        references: {
          model: "pages",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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
      section_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sort_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      config_json: {
        type: Sequelize.JSON,
      },
      style_json: {
        type: Sequelize.JSON,
      },
      is_visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.addConstraint("page_sections", {
      fields: ["page_id", "sort_order"],
      type: "unique",
      name: "unique_page_sections_page_id_sort_order",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "page_sections",
      "unique_page_sections_page_id_sort_order",
    );
    await queryInterface.dropTable("page_sections");
  },
};
