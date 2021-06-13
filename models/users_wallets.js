'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Wallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.usersAssociation = this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      this.walletAssociation = this.belongsTo(models.Wallet, {
        foreignKey: 'wallet_id'
      })
    }
  };
  Users_Wallets.init({
    wallet_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_Wallets',
  });
  return Users_Wallets;
};