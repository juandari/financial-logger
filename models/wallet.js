'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.usersAssociation = this.hasMany(models.Users_Wallets, {
        foreignKey: 'wallet_id'
      })
      this.transactionAssociation = this.hasMany(models.Transaction, {
        foreignKey: 'wallet_id'
      })
    } 
  };
  Wallet.init({
    name: DataTypes.STRING,
    balance: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};