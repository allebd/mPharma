import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  diagnosisService: {
    createDiagnosis
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

export default { postDiagnosis };
