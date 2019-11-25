import helpers from '../helpers';

const {
  errorHelper: { validatorError },
  validatorHelper: {
    isValidBody, isValidOptionalBody, isValidParam
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
  ]
};

export default diagnosisValidator;
