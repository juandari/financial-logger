'use strict';

const timetampsToDate = require('../helpers/convertTimestampToDate')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.categoryAssociation = this.belongsTo(models.Categories, {
      //   foreignKey: 'category_id'
      // })
      this.usersAssociation = this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      this.walletAssociation = this.belongsTo(models.Wallet, {
        foreignKey: 'wallet_id'
      })
    }
  };
  Transaction.init({
    user_id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    category: DataTypes.STRING,
    note: DataTypes.STRING,
    wallet_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Choose wallet before saving a transaction'
        }
      }
    },
    transaction_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};