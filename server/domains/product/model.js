import { dbQueryOptions } from 'src/services/pagination';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discounted_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    image_2: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    display: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'product'
  });
  Product.associate = function (models) {
    Product.belongsToMany(models.Category, {
      foreignKey: 'product_id',
      otherKey: 'category_id',
      timestamps: false,
      through: 'product_category',
      as: 'categories'
    });
    Product.belongsToMany(models.AttributeValue, {
      foreignKey: 'product_id',
      otherKey: 'attribute_value_id',
      through: 'product_attribute',
      as: 'attribute_values',
      timestamps: false,
    });

    Product.getAllProductsAndCount = async (paginationMeta) => {
      const queryOptions = dbQueryOptions(paginationMeta);
      const rows = await Product.findAll({
        ...queryOptions
      });
      const count = await Product.count();
      return { rows, count };
    };

    Product.getCategoryProductsAndCount = async function getCategoryProducts(requestMeta, categoryId) {
      const { Category } = models;
      const category = await Category.findByPk(categoryId);

      const queryOptions = dbQueryOptions(requestMeta);
      const rows = await category.getProducts({
        ...queryOptions
      });

      const count = await category.countProducts();
      return { rows, count };
    };
  };

  Product.removeAttribute('id');

  return Product;
};
