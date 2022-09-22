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
    // static async addSpotListing({ }) {
    //   const spot = await Spot.create({
    //     ownerId: userId,
    //     address,
    //     city,
    //     state,
    //     country,
    //     lat,
    //     lng,
    //     name,
    //     description,
    //     price
    //   });

    // }

    static associate(models) {

      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId', as: 'Owner' }
      );

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

      Spot.hasMany(models.Image, {
        foreignKey: 'imageableId',
        as: 'SpotImages',
        constraints: false,
        scope: {
          imageableType: 'Spot'
        }
      });

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      validate: {
        len: [2, 49],
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avgRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    defaultScope: {
      // attributes: {
      //   exclude: ["createdAt", "updatedAt"]
      // }
    },
    scopes: {
      // atSpot(spotId) {
      //   const { Image, User } = require('../models');
      //   return {
      //     where: { spotId },
      //     include: [{ model: Image }]
      //   }
      // }
    },
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};