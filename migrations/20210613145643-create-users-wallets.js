'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users_Wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Wallets',
          key: 'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users_Wallets');
  }
};