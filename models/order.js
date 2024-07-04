module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      productId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      totalPrice: {
          type: DataTypes.DECIMAL,
          allowNull: false
      }
  });

  return Order;
};
