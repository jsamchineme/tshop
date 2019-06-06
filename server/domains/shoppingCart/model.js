import { Op } from 'sequelize';

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
    tableName: 'shopping_cart',
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
      savedForLater: {
        where: {
          buy_now: {
            [Op.eq]: false
          }
        },
      }
    }
  });

  ShoppingCart.initialise = function (models) {
    // ShoppingCart is a collection of CartItems
    // This could rather be name CartItem
    ShoppingCart.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });

    ShoppingCart.scopeByField = (
      field,
      value
    ) => ShoppingCart.scope({ method: ['byField', { field, value }] });

    ShoppingCart.findProductInCart = async (data) => {
      // check that product is not already added
      const { product_id, cart_id } = data;
      const foundProducts = await ShoppingCart.findAll({
        where: {
          product_id: { [Op.eq]: product_id },
          cart_id: { [Op.eq]: cart_id },
        },
        attributes: ['item_id']
      });

      return foundProducts[0];
    };

    ShoppingCart.getTotalAmountForCart = async ({ cartId }) => {
      const rows = await ShoppingCart.findCartItems({ cartId });
      let total_amount = 0;

      rows.forEach((item) => {
        total_amount += Number(item.product.price) * item.quantity;
      });
      return total_amount;
    };

    ShoppingCart.findCartItems = async ({ cartId, scope }) => {
      let rows;
      if (scope === 'savedForLater') {
        rows = await ShoppingCart.scopeByField('cart_id', cartId).findAll({
          include: {
            model: models.Product,
            as: 'product'
          },
          where: {
            buy_now: { [Op.eq]: false }
          }
        });
      } else {
        rows = await ShoppingCart.scopeByField('cart_id', cartId).findAll({
          include: {
            model: models.Product,
            as: 'product'
          }
        });
      }
      return rows;
    };

    ShoppingCart.emptyCart = async (cartId) => {
      const rows = await ShoppingCart.scopeByField('cart_id', cartId).destroy();
      return rows;
    };
  };

  ShoppingCart.removeAttribute('id');
  return ShoppingCart;
};
