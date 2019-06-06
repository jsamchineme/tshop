import { Op } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00',
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    shipped_on: {
      type: DataTypes.DATE,
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
    tableName: 'orders',
    scopes: {
      byField({ field, value }) {
        return {
          where: {
            [field]: {
              [Op.eq]: value
            }
          }
        };
      },
    },
    hooks: {
      async beforeCreate(order) {
        const foundShipping = await order.getShipping();
        const foundTax = await order.getTax();
        if (!foundShipping) {
          throw new Error('Wrong Shipping ID');
        }
        if (!foundTax) {
          throw new Error('Wrong Tax ID');
        }
      },
    },
  });
  Order.initialise = function (models) {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer'
    });
    Order.belongsTo(models.Shipping, {
      foreignKey: 'shipping_id',
      as: 'shipping',
    });
    Order.belongsTo(models.Tax, {
      foreignKey: 'tax_id',
      as: 'tax',
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

    Order.createOrder = async (data) => {
      const { ShoppingCart: ShoppingCartModel } = models;
      const totalAmount = await ShoppingCartModel.getTotalAmountForCart({ cartId: data.cart_id });

      // totalAmount when no item exists for the cart Id
      // which actually that the cart does not exist
      // since there cannot be a cart without at least an item
      // In such a case, we cannot create the order
      if (!totalAmount) {
        throw new Error('No Item for Cart');
      }

      return Order.create({
        total_amount: totalAmount,
        created_on: data.created_on,
        status: data.status,
        comments: data.comments || '',
        customer_id: data.customer_id,
        auth_code: data.auth_code || '',
        reference: data.reference || '',
        shipping_id: data.shipping_id,
        tax_id: data.tax_id,
      });
    };

    Order.scopeByField = (
      field,
      value
    ) => Order.scope({ method: ['byField', { field, value }] });

    Order.getCustomerOrders = async ({ customer_id }) => {
      const rows = await Order.scopeByField('customer_id', customer_id).findAll();
      return rows;
    };
  };

  Order.removeAttribute('id');
  return Order;
};
