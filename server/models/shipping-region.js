module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shipping_region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'shipping_region'
  });

  ShippingRegion.removeAttribute('id')
  return ShippingRegion;
};