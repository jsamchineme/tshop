module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shipped_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auth_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'order'
  });
  Order.associate = function(models) {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer'
    });
    Order.belongsTo(models.Shipping, {
      foreignKey: 'shipping_id',
      as: 'shipping'
    });
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'order_id',
      as: 'order_details'
    });
    Order.belongsToMany(models.Product, {
      foreignKey: 'order_id',
      otherKey: 'product_id',
      as: 'order_products',
      through: 'order_detail',
      timestamps: false,
    });
  };

  Order.removeAttribute('id')
  return Order;
};