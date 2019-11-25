import express from 'express';
import helpers from '../helpers';
import middlewares from '../middlewares';
import diagnosisController from '../controllers/diagnosisController';

const diagnosis = express.Router();
const DIAGNOSIS_URL = '/diagnosis';
const { tryCatchHelper } = helpers;
const {
  postDiagnosis,
  editDiagnosis,
  getAllDiagnosis
} = diagnosisController;
const {
  diagnosisValidator: {
    postDiagnosisValidator,
    editDiagnosisValidator,
    getAllDiagnosisValidator
  }
} = middlewares;

// Route to create a new diagnosis record
diagnosis.post(`${DIAGNOSIS_URL}`, postDiagnosisValidator, tryCatchHelper(postDiagnosis));

// Route to edit a diagnosis record
diagnosis.patch(`${DIAGNOSIS_URL}/:diagnosisId`, editDiagnosisValidator, tryCatchHelper(editDiagnosis));

// Route to get all diagnosis record
diagnosis.get(`${DIAGNOSIS_URL}`, getAllDiagnosisValidator, tryCatchHelper(getAllDiagnosis));

export default diagnosis;
