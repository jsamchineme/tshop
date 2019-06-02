module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    name: DataTypes.STRING,
    attribute_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'attribute'
  });
  Attribute.associate = function(models) {
    // associations can be defined here
  };

  Attribute.removeAttribute('id')
  return Attribute;
};