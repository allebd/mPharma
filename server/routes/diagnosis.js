import express from 'express';
import helpers from '../helpers';
import middlewares from '../middlewares';
import diagnosisController from '../controllers/diagnosisController';

const diagnosis = express.Router();
const DIAGNOSIS_URL = '/diagnosis';
const { tryCatchHelper } = helpers;
const { postDiagnosis } = diagnosisController;
const { diagnosisValidator: { postDiagnosisValidator } } = middlewares;

// Route to create a new diagnosis record
diagnosis.post(`${DIAGNOSIS_URL}`, postDiagnosisValidator, tryCatchHelper(postDiagnosis));

export default diagnosis;
