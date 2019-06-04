module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'category'
  });
  Category.associate = function (models) {
    Category.belongsToMany(models.Product, {
      foreignKey: 'category_id',
      otherKey: 'product_id',
      timestamps: false,
      through: 'product_category',
      as: 'products'
    });
  };

  Category.removeAttribute('id');

  return Category;
};
