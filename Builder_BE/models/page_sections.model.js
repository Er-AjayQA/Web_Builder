const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PageSections extends Model {
    static associate(models) {
      PageSections.belongsTo(models.PagesModel, {
        foreignKey: "page_id",
        as: "page",
      });
      PageSections.belongsTo(models.WebsitesModel, {
        foreignKey: "website_id",
        as: "website",
      });
    }
  }
  PageSections.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      order_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      page_id: {
        type: DataTypes.UUID,
        references: {
          model: "pages",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      website_id: {
        type: DataTypes.UUID,
        references: {
          model: "websites",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      section_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      config_json: {
        type: DataTypes.JSON,
      },
      style_json: {
        type: DataTypes.JSON,
      },
      is_visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "PageSections",
      tableName: "page_sections",
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return PageSections;
};
