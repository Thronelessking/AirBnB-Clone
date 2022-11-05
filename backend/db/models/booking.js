'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      });
    }
  }
  Booking.init({
    spotId: { type: DataTypes.INTEGER, allowNull: false, },
    userId: { type: DataTypes.INTEGER, allowNull: false, },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
  }, {
    sequelize,
    validate: {
      endBeforeStart() {
        //const err = new Error("endDate cannot be on or before startDate");
        //err.code = 403;
        if (this.startDate >= this.endDate) {
          throw new Error("endDate cannot be on or before startDate", { status: 404 });
        }
      },
      beforeCurrentDate() {
        let currentDate = new Date().toJSON().slice(0, 10);
        if (this.startDate <= currentDate) {
          throw new Error("startDate cannot be before today", { status: 404 });

        }
      }
    },
    modelName: 'Booking',
  });
  return Booking;
};