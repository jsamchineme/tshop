module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit_card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eve_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mob_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'customer'
  });
  Customer.associate = function(models) {
    Customer.hasOne(models.ShippingRegion, {
      foreignKey: 'shipping_region_id',
      as: 'shipping_region'
    });
  };

  Customer.removeAttribute('id')
  return Customer;
};