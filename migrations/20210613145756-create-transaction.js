'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Users',
          key: 'id'
        }
      },
      type: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.BIGINT
      },
      category: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Wallets',
          key: 'id'
        }
      },
      transaction_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};