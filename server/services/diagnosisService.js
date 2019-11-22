import models from '../database/models';

const { Diagnosis } = models;

/**
 * Creates a diagnosis record in the database
 * @param {string} diagnosisCode
 * @param {string} fullCode
 * @param {string} abbreviatedDescription
 * @param {string} fullDescription
 * @param {string} categoryId
 * @param {string} diagnosisCodeType
 * @returns {object} an object
 */
const createDiagnosis = async (
  diagnosisCode,
  fullCode,
  abbreviatedDescription,
  fullDescription,
  categoryId,
  diagnosisCodeType
) => {
  const createdDiagnosis = await Diagnosis.create({
    diagnosisCode,
    fullCode,
    abbreviatedDescription,
    fullDescription,
    categoryId,
    diagnosisCodeType
  });
  return createdDiagnosis;
};

export default { createDiagnosis };
