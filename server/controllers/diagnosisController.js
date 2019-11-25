import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  diagnosisService: {
    createDiagnosis,
    updateDiagnosis,
    fetchDiagnosis
  }
} = services;

/**
 * @description Creates a new diagnosis record
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const postDiagnosis = async (request, response) => {
  const {
    body: {
      diagnosisCode,
      fullCode,
      abbreviatedDescription,
      fullDescription,
      categoryId,
      diagnosisCodeType
    }
  } = request;
  const diagnosis = await createDiagnosis(
    diagnosisCode,
    fullCode,
    abbreviatedDescription,
    fullDescription,
    categoryId,
    diagnosisCodeType
  );
  return responseHelper(response, 201, {
    message: 'record successfully added',
    data: { record: diagnosis }
  });
};

/**
 * @description Edit a diagnosis record
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const editDiagnosis = async (request, response) => {
  const { body, params: { diagnosisId } } = request;
  const fetchedDiagnosis = await fetchDiagnosis(diagnosisId);
  if (!fetchedDiagnosis) {
    return responseHelper(response, 404, {
      message: 'record not found'
    });
  }
  const diagnosis = await updateDiagnosis(body, diagnosisId);
  return responseHelper(response, 200, {
    message: 'record successfully updated',
    data: { record: diagnosis }
  });
};

export default { postDiagnosis, editDiagnosis };
