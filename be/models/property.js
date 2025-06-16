'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.PropertyType, {
        foreignKey: 'propertyTypeId',
        as: 'propertyType',
      })
      Property.belongsTo(models.User, {
        foreignKey: 'owner',
        as: 'ownerUser',
      })
      Property.belongsTo(models.User, {
        foreignKey: 'postedBy',
        as: 'postedByUser',
      })
      Property.hasMany(models.PropertyFeature, {
        foreignKey: 'propertyId',
        as: 'features',
      })
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      listingType: {
        type: DataTypes.ENUM,
        values: ['SALE', 'RENT'],
      },
      price: DataTypes.FLOAT,
      propertyTypeId: DataTypes.UUID,
      owner: DataTypes.UUID,
      status: {
        type: DataTypes.ENUM,
        values: ['PENDING', 'CANCEL', 'APPROVED'],
      },
      isAvailable: DataTypes.BOOLEAN,
      images: {
        type: DataTypes.TEXT,
        get() {
          const value = this.getDataValue('images')
          return value ? JSON.parse(value) : []
        },
        set(value) {
          this.setDataValue('images', JSON.stringify(value))
        },
      },
      featureImage: DataTypes.STRING,
      address: DataTypes.STRING,
      postedBy: DataTypes.UUID,
      bedRoom: DataTypes.INTEGER,
      bathRoom: DataTypes.INTEGER,
      propertySize: DataTypes.FLOAT,
      yearBuilt: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Property',
    },
  )
  return Property
}
