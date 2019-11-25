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

/**
 * Updates a diagnosis record in the database
 * @param {string} body
 * @param {string} id
 * @returns {object} an object
 */
const updateDiagnosis = async (body, id) => {
  const updatedDiagnosis = await Diagnosis.update(
    {
      ...body
    },
    {
      where: { id },
      returning: true
    }
  );
  return updatedDiagnosis[1][0];
};

/**
 * Fetch a diagnosis record
 * @param {string} id
 * @returns {object} an object
 */
const fetchDiagnosis = async (id) => {
  const fetchedDiagnosis = await Diagnosis.findOne({
    where: { id }
  });
  return fetchedDiagnosis;
};

export default { createDiagnosis, updateDiagnosis, fetchDiagnosis };
