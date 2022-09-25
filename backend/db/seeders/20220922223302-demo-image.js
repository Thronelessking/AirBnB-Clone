'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', [
      {
        previewImage: true,
        url: "newhouse.jpg",
        imageableType: "Spot",
        imageableId: 2
      },
      {
        previewImage: false,
        url: "review2.jpg",
        imageableType: "Review",
        imageableId: 2
      },
      {
        previewImage: false,
        url: "spot2.jpg",
        imageableType: "Spot",
        imageableId: 2
      },
      {
        previewImage: true,
        url: "spot1.jpg",
        imageableType: "Spot",
        imageableId: 1
      },
      {
        previewImage: false,
        url: "whatanuglyhouse.jpg",
        imageableType: "Spot",
        imageableId: 1
      },
      {
        previewImage: false,
        url: "review1.jpg",
        imageableType: "Review",
        imageableId: 1
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Images', {
      imageableId: { [Op.in]: [1, 2] }
    }, {});

  }
};
