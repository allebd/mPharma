import helpers from '../helpers';

const {
  errorHelper: { validatorError },
  validatorHelper: {
    isValidBody
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
  ]
};

export default diagnosisValidator;
