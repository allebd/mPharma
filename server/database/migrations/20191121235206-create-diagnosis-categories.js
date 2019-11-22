export const up = (queryInterface, Sequelize) => queryInterface.createTable('DiagnosisCategories', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID
  },
  categoryCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoryTitle: {
    type: Sequelize.STRING,
    allowNull: false
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
export const down = (queryInterface) => queryInterface.dropTable('DiagnosisCategories');
