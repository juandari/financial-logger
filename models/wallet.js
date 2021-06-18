'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.usersAssociation = this.hasMany(models.Users_Wallets, {
        foreignKey: 'wallet_id',
      })
      this.transactionAssociation = this.hasMany(models.Transaction, {
        foreignKey: 'wallet_id',
      })
    }
  }
  Wallet.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'name cannot be empty',
          },
        },
      },
      balance: {
        type: DataTypes.BIGINT,
        validate: {
          min: {
            args: 1,
            msg: 'transaction must be > 0',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Wallet',
    }
  )
  return Wallet
}
