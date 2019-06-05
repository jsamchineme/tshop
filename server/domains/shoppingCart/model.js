module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attributes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buy_now: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    timestamps: false,
    tableName: 'shopping_cart'
  });
  ShoppingCart.initialise = function(models) {
    // ShoppingCart is a collection of CartItems
    // This could rather be name CartItem
    ShoppingCart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  ShoppingCart.removeAttribute('id')
  return ShoppingCart;
};