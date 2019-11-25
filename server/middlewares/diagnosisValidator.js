import helpers from '../helpers';

const {
  errorHelper: { validatorError },
  validatorHelper: {
    isValidBody,
    isValidOptionalBody,
    isValidParam,
    isValidInt
  }
} = helpers;

const diagnosisValidator = {
  postDiagnosisValidator: [
    isValidBody('diagnosisCode'),
    isValidBody('fullCode'),
    isValidBody('abbreviatedDescription'),
    isValidBody('fullDescription'),
    isValidBody('categoryId'),
    isValidBody('diagnosisCodeType'),
    validatorError
  ],
  editDiagnosisValidator: [
    isValidParam('diagnosisId'),
    isValidOptionalBody('diagnosisCode'),
    isValidOptionalBody('fullCode'),
    isValidOptionalBody('abbreviatedDescription'),
    isValidOptionalBody('fullDescription'),
    isValidOptionalBody('categoryId'),
    isValidOptionalBody('diagnosisCodeType'),
    validatorError
  ],
  getAllDiagnosisValidator: [
    isValidInt('page').optional(),
    isValidInt('limit').optional(),
    validatorError
  ],
  getDiagnosisValidator: [
    isValidParam('diagnosisId'),
    validatorError
  ]
};

export default diagnosisValidator;
