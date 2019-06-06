import { dbQueryOptions } from 'src/services/pagination';
import { Op } from 'sequelize';

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

  Product.initialise = function (models) {
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
      as: 'details',
      timestamps: false,
    });
    Product.hasMany(models.Review, {
      foreignKey: 'product_id',
      as: 'reviews',
    });

    Product.getAllProductsAndCount = async ({ paginationMeta }) => {
      const queryOptions = dbQueryOptions(paginationMeta);
      const rows = await Product.findAll({ ...queryOptions });
      const count = await Product.count();
      return { rows, count };
    };

    Product.getCategoryProductsAndCount = async ({ paginationMeta, categoryId }) => {
      const { Category } = models;
      const category = await Category.findByPk(categoryId);
      const queryOptions = dbQueryOptions(paginationMeta);
      const rows = await category.getProducts({ ...queryOptions });
      const count = await category.countProducts();
      return { rows, count };
    };

    Product.getDepartmentProductsAndCount = async ({
      paginationMeta,
      departmentId,
      throwDepartmentNotFound
    }) => {
      const { Department } = models;
      const department = await Department.findByPk(departmentId);
      if (!department) {
        return throwDepartmentNotFound();
      }
      const categories = await department.getCategories({
        include: { model: models.Product, as: 'products', required: true }
      });
      const productIds = [];
      categories.map((category) => {
        category.products.forEach(product => productIds.push(product.product_id));
        return productIds;
      });

      const queryOptions = dbQueryOptions(paginationMeta);
      const rows = await Product.findAll({
        ...queryOptions,
        where: { product_id: { [Op.in]: productIds } },
      });
      const count = productIds.length;
      return { rows, count };
    };

    Product.getProductDetails = async ({
      productId,
      throwProductNotFound
    }) => {
      const product = await Product.findByPk(productId);

      if (!product) {
        return throwProductNotFound();
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

    Product.getProductLocations = async ({
      productId,
      throwProductNotFound
    }) => {
      const product = await Product.findByPk(productId);

      if (!product) {
        return throwProductNotFound();
      }

      const rows = await product.getCategories({
        include: [{
          model: models.Department,
          as: 'department',
          required: true,
        }]
      });

      return { rows };
    };

    Product.getProductReviewsAndCount = async ({
      productId,
      paginationMeta,
      throwProductNotFound
    }) => {
      const product = await Product.findByPk(productId);

      if (!product) {
        return throwProductNotFound();
      }
      const queryOptions = dbQueryOptions(paginationMeta);
      const rows = await product.getReviews({ ...queryOptions });
      const count = await product.countReviews();

      return { rows, count };
    };

    Product.createProductReview = async ({ data, throwProductNotFound, productId }) => {
      const product = await Product.findByPk(productId);
      if (!product) {
        return throwProductNotFound();
      }

      const newProductReview = await product.createReview({
        ...data,
      });

      return newProductReview;
    };
  };

  Product.removeAttribute('id');
  return Product;
};
