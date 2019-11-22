export const up = (queryInterface, Sequelize) => queryInterface.createTable('Diagnoses', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID
  },
  diagnosisCode: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fullCode: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  abbreviatedDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fullDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  diagnosisCodeType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoryId: {
    type: Sequelize.UUID,
    allowNull: false,
    onDelete: 'CASCADE',
    references: {
      model: 'DiagnosisCategories',
      key: 'id'
    },
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
export const down = (queryInterface) => queryInterface.dropTable('Diagnoses');
