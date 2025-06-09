'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.Role, {
        foreignKey: 'roleCode',
        as: 'roleName',
        targetKey: 'code',
      })
    }
  }
  UserRole.init(
    {
      uid: DataTypes.UUID,
      roleCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserRole',
    },
  )
  return UserRole
}
