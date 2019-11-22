export default (sequelize, DataTypes) => {
  const DiagnosisCategories = sequelize.define('DiagnosisCategories', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    categoryCode: DataTypes.STRING,
    categoryTitle: DataTypes.STRING
  }, {});
  DiagnosisCategories.associate = () => {
    // associations can be defined here
  };
  return DiagnosisCategories;
};
