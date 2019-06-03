module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    tableName: 'department'
  });
  Department.associate = function(models) {
    // associations can be defined here
  };

  Department.removeAttribute('id')
  return Department;
};