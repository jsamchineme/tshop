import { dbQueryOptions } from 'src/services/pagination';

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

  Category.initialise = function (models) {
    Category.belongsToMany(models.Product, {
      foreignKey: 'category_id',
      otherKey: 'product_id',
      timestamps: false,
      through: 'product_category',
      as: 'products'
    });
    Category.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department'
    });

    Category.getAllCategoriesAndCount = async ({ paginationMeta }) => {
      const queryOptions = dbQueryOptions(paginationMeta);
      const rows = await Category.findAll({
        ...queryOptions
      });
      const count = await Category.count();
      return { rows, count };
    };

    Category.getProductCategories = async ({ productId, throwProductNotFound }) => {
      const { Product: ProductModel } = models;
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        throwProductNotFound();
      }
      const rows = await product.getCategories();
      return { rows };
    };

    Category.getDepartmentCategories = async ({ departmentId, throwDepartmentNotFound }) => {
      const { Department } = models;
      const department = await Department.findByPk(departmentId);
      if (!department) {
        return throwDepartmentNotFound();
      }
      const rows = await department.getCategories();
      return { rows };
    };
  };

  Category.removeAttribute('id');

  return Category;
};
