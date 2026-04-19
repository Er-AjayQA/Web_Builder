const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Websites extends Model {
    static associate(models) {
      Websites.belongsTo(models.TenantsModel, {
        foreignKey: "tenant_id",
        as: "tenant",
      });
      Websites.belongsTo(models.ThemesModel, {
        foreignKey: "theme_id",
        as: "theme",
      });
      Websites.hasMany(models.PagesModel, {
        foreignKey: "website_id",
        as: "pages",
      });
      Websites.hasMany(models.PageSectionsModel, {
        foreignKey: "website_id",
        as: "sections",
      });
    }
  }
  Websites.init(
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
      tenant_id: {
        type: DataTypes.UUID,
        references: {
          model: "tenants",
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subdomain: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      custom_domain: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      theme_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "themes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      is_published: {
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
      modelName: "Websites",
      tableName: "websites",
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Websites;
};
