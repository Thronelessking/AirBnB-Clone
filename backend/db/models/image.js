'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);
      const imageMixin = `get${this.commentableType}`;
      return this[imageMixin](options);
    }

    static associate(models) {

      Image.belongsTo(models.User, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.Spot, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.Review, {
        foreignKey: 'imageableId',
        constraints: false
      });

    }
  }
  Image.init({
    url: DataTypes.STRING,
    imageableType: DataTypes.STRING,
    imageableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};