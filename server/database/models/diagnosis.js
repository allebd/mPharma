export default (sequelize, DataTypes) => {
  const Diagnosis = sequelize.define('Diagnosis', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    diagnosisCode: DataTypes.STRING,
    fullCode: DataTypes.STRING,
    abbreviatedDescription: DataTypes.STRING,
    fullDescription: DataTypes.TEXT,
    categoryId: DataTypes.UUID,
    diagnosisCodeType: DataTypes.STRING
  }, {});
  Diagnosis.associate = (models) => {
    // associations can be defined here
    Diagnosis.belongsTo(models.DiagnosisCategories, {
      foreignKey: 'categoryId',
    });
  };
  return Diagnosis;
};
