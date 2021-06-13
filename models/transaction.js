'use strict';
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
      this.categoryAssociation = this.belongsTo(models.Categories, {
        foreignKey: 'category_id'
      })
      this.usersAssociation = this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  };
  Transaction.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    category_id: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};