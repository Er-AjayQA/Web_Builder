const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pages extends Model {
    static associate(models) {
      Pages.belongsTo(models.WebsitesModel, {
        foreignKey: "website_id",
        as: "website",
      });
      Pages.hasMany(models.PageSectionsModel, {
        foreignKey: "page_id",
        as: "sections",
      });
    }
  }
  Pages.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      page_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seo_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      seo_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content_json: {
        type: DataTypes.JSON,
      },
      published_content_json: {
        type: DataTypes.JSON,
      },
      is_homepage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "Pages",
      tableName: "pages",
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Pages;
};
