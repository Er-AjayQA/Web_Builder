const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tenants extends Model {
    static associate(models) {
      Tenants.belongsTo(models.UsersModel, {
        foreignKey: "owner_user_id",
        as: "owner",
      });
      Tenants.hasMany(models.WebsitesModel, {
        foreignKey: "tenant_id",
        as: "ownedWebsites",
      });
    }
  }
  Tenants.init(
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
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      plan: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "free",
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
      modelName: "Tenants",
      tableName: "tenants",
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );
  return Tenants;
};
