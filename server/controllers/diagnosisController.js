import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  diagnosisService: {
    countDiagnosis,
    createDiagnosis,
    updateDiagnosis,
    fetchDiagnosis,
    fetchAllDiagnosis
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
    data: { diagnosis }
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
    data: { diagnosis }
  });
};

/**
 * @description Gets all diagnosis record
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getAllDiagnosis = async (request, response) => {
  const { query: { page = 1, limit = 20 } } = request;
  const diagnosisCount = await countDiagnosis();
  if (!diagnosisCount) {
    return responseHelper(response, 404, {
      message: 'record not found'
    });
  }
  const pages = Math.ceil(diagnosisCount / limit);
  if (page > pages) {
    return responseHelper(response, 404, {
      message: 'page not found'
    });
  }

  const offset = limit * (page - 1);
  const diagnosis = await fetchAllDiagnosis(offset, limit);
  return responseHelper(response, 200, {
    message: 'records successfully retrieved',
    data: {
      diagnosis,
      currentPage: page,
      totalPages: pages,
      limit
    }
  });
};

/**
 * @description Gets a diagnosis record
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getDiagnosis = async (request, response) => {
  const { params: { diagnosisId } } = request;
  const diagnosis = await fetchDiagnosis(diagnosisId);
  if (!diagnosis) {
    return responseHelper(response, 404, {
      message: 'record not found'
    });
  }
  return responseHelper(response, 200, {
    message: 'record successfully retrieved',
    data: { diagnosis }
  });
};

/**
 * @description Delete a diagnosis record
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const deleteDiagnosis = async (request, response) => {
  const { params: { diagnosisId } } = request;
  const diagnosis = await fetchDiagnosis(diagnosisId);
  if (!diagnosis) {
    return responseHelper(response, 404, {
      message: 'record not found'
    });
  }
  return responseHelper(response, 200, {
    message: 'record successfully deleted'
  });
};

export default {
  postDiagnosis,
  editDiagnosis,
  getAllDiagnosis,
  getDiagnosis,
  deleteDiagnosis
};
