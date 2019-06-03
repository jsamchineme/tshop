module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tax_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tax_percentage: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'tax'
  });

  Tax.removeAttribute('id')
  return Tax;
};