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

  ShippingRegion.initialise = function (models) {
    ShippingRegion.hasMany(models.Shipping, {
      foreignKey: 'shipping_region_id',
      as: 'shippings'
    });

    ShippingRegion.getAllShippingRegions = async () => {
      const rows = await ShippingRegion.findAll();
      return { rows };
    };

    ShippingRegion.getShippingsForARegion = async ({
      shippingRegionId,
      throwRegionNotFound
    }) => {
      const region = await ShippingRegion.findByPk(shippingRegionId);
      if (!region) {
        throwRegionNotFound();
      }
      const rows = await region.getShippings();
      return { rows };
    };
  };

  ShippingRegion.removeAttribute('id');
  return ShippingRegion;
};
