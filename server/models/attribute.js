module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    name: {
      type:DataTypes.STRING,
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

  Attribute.removeAttribute('id')
  return Attribute;
};