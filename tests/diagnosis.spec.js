import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import mockData from './mockData';

chai.use(chaiHttp);

const { diagnosisMock } = mockData;
const {
  validDiagnosis,
  invalidDiagnosis,
  updateDiagnosis,
  invalidDiagnosis1
} = diagnosisMock;

const BASE_URL = '/api/v1';
const DIAGNOSIS_VALID_URL = `${BASE_URL}/diagnosis`;
const UPDATE_DIAGNOSIS_VALID_URL = `${BASE_URL}/diagnosis/6a7b986e-1102-4e9a-83b0-cad7df993e1c`;
const NOT_FOUND_DIAGNOSIS_URL = `${BASE_URL}/diagnosis/122a0d86-8b78-4bb8-b28f-8e5f7811c456`;
const INVALID_DIAGNOSIS_URL = `${BASE_URL}/diagnosis/891`;

describe('DIAGNOSIS TEST', () => {
  describe('CREATE A NEW DIAGNOSIS RECORD', () => {
    it('should return an error if the fullDescription is missing from the request', (done) => {
      chai.request(server)
        .post(DIAGNOSIS_VALID_URL)
        .send(invalidDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          expect(response.body.error[0].message).to.equal('fullDescription cannot be empty');
          done();
        });
    });

    it('should successfully create a comment', (done) => {
      chai.request(server)
        .post(DIAGNOSIS_VALID_URL)
        .send(validDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.haveOwnProperty('record');
          expect(response.body.data.record).to.be.an('object');
          expect(response.body.data.record).to.have.keys(['id', 'diagnosisCode', 'fullCode', 'abbreviatedDescription', 'fullDescription', 'categoryId', 'diagnosisCodeType', 'updatedAt', 'createdAt']);
          done();
        });
    });
  });

  describe('EDIT A DIAGNOSIS RECORD', () => {
    it('should successfully update a diagnosis record', (done) => {
      chai.request(server)
        .patch(UPDATE_DIAGNOSIS_VALID_URL)
        .send(updateDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.haveOwnProperty('record');
          expect(response.body.data.record).to.be.an('object');
          expect(response.body.data.record).to.have.keys(['id', 'diagnosisCode', 'fullCode', 'abbreviatedDescription', 'fullDescription', 'categoryId', 'diagnosisCodeType', 'updatedAt', 'createdAt']);
          done();
        });
    });

    it('should not be able to update a diagnosis record if the record is empty', (done) => {
      chai.request(server)
        .patch(UPDATE_DIAGNOSIS_VALID_URL)
        .send(invalidDiagnosis1)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('should not be able to update a diagnosis record if the diagnosis record number invalid', (done) => {
      chai.request(server)
        .patch(INVALID_DIAGNOSIS_URL)
        .send(updateDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('should not be able to update a diagnosis record if the diagnosis record number does not exist', (done) => {
      chai.request(server)
        .patch(NOT_FOUND_DIAGNOSIS_URL)
        .send(updateDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('record not found');
          done();
        });
    });
  });
});
