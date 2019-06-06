module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    }
  }, {
    timestamps: false,
    tableName: 'attribute'
  });

  Attribute.initialise = function (models) {
    Attribute.hasMany(models.AttributeValue, {
      foreignKey: 'attribute_id',
      as: 'values'
    });

    Attribute.getAllAttributes = async () => {
      const rows = await Attribute.findAll();
      return { rows };
    };

    Attribute.getValuesForAttribute = async ({ throwAttributeNotFound, attributeId }) => {
      const attribute = await Attribute.findByPk(attributeId);

      if (!attribute) {
        throwAttributeNotFound();
      }
      const rows = await attribute.getValues();
      return { rows };
    };

    Attribute.getProductAttributes = async ({ throwProductNotFound, productId }) => {
      const { Product } = models;
      const product = await Product.findByPk(productId);
      if (!product) {
        throwProductNotFound();
      }
      const rows = await product.getDetails({
        include: [{
          model: models.Attribute,
          as: 'attribute',
          required: true,
        }]
      });

      return { rows };
    };
  };

  Attribute.removeAttribute('id');
  return Attribute;
};
