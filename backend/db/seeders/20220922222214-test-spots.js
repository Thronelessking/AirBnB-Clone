'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "12 Baller Avenue",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
        previewImage: false,
      },
      {
        ownerId: 4,
        address: "9992 Liberty Street",
        city: "Derry",
        state: "New Hampshire",
        country: "United States of America",
        lat: 34.7645358,
        lng: -112.4730327,
        name: "Derry House",
        description: "Dreary Derry Baby",
        price: 234,
        previewImage: false,
      },
      {
        ownerId: 1,
        address: "7958 Magnolia Avenue",
        city: "Linden",
        state: "New Jersey",
        country: "United States of America",
        lat: 32.7645358,
        lng: -102.4730327,
        name: "What this is seed data",
        description: "Again this is seed data, grasping hairs",
        price: 456,
        previewImage: false,
      },
      {
        ownerId: 2,
        address: "123 Driver Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 567,
        previewImage: false,
      },

    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ["194 Argyle Drive", "3452 Argyle Drive", "123 Driver Lane", "7958 Magnolia Avenue", "9992 Liberty Street", "12 Baller Avenue"] }
    }, {});

  }
};
