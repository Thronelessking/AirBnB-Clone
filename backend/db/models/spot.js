'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      }
      );
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      }
      );
      Spot.belongsTo(models.User,
        { foreignKey: 'userId' }
      );
      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        onDelete: 'CASCADE',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        }
      });

    }
  }
  Spot.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"]
      }
    },
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};