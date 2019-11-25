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
const SINGLE_DIAGNOSIS_VALID_URL = `${BASE_URL}/diagnosis/6a7b986e-1102-4e9a-83b0-cad7df993e1c`;
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

    it('should successfully create a diagnosis record', (done) => {
      chai.request(server)
        .post(DIAGNOSIS_VALID_URL)
        .send(validDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.haveOwnProperty('diagnosis');
          expect(response.body.data.diagnosis).to.be.an('object');
          expect(response.body.data.diagnosis).to.have.keys(['id', 'diagnosisCode', 'fullCode', 'abbreviatedDescription', 'fullDescription', 'categoryId', 'diagnosisCodeType', 'updatedAt', 'createdAt']);
          done();
        });
    });
  });

  describe('EDIT A DIAGNOSIS RECORD', () => {
    it('should successfully update a diagnosis record', (done) => {
      chai.request(server)
        .patch(SINGLE_DIAGNOSIS_VALID_URL)
        .send(updateDiagnosis)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.haveOwnProperty('diagnosis');
          expect(response.body.data.diagnosis).to.be.an('object');
          expect(response.body.data.diagnosis).to.have.keys(['id', 'diagnosisCode', 'fullCode', 'abbreviatedDescription', 'fullDescription', 'categoryId', 'diagnosisCodeType', 'updatedAt', 'createdAt']);
          done();
        });
    });

    it('should not be able to update a diagnosis record if the record is empty', (done) => {
      chai.request(server)
        .patch(SINGLE_DIAGNOSIS_VALID_URL)
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

  describe('GET ALL DIAGNOSIS RECORDS', () => {
    it('should successfully return all diagnosis', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data).to.have.keys(['diagnosis', 'currentPage', 'totalPages', 'limit']);
          done();
        });
    });
  });

  describe('PAGINATION SUPPORT FOR DIAGNOSIS LISTING', () => {
    it('should return an error response if the page provided is not an integer', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .query({ page: 'abc', limit: 20 })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('page');
          expect(response.body.error[0].message).to.equal('page must be an integer');
          done();
        });
    });

    it('should return an error response if the limit provided is not an integer', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .query({ page: 1, limit: 'abc' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('limit');
          expect(response.body.error[0].message).to.equal('limit must be an integer');
          done();
        });
    });

    it('should return an error response if the limit query provided is empty', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .query({ page: 1, limit: '' })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('limit');
          expect(response.body.error[0].message).to.equal('limit cannot be empty');
          done();
        });
    });

    it('should return an error response if the page query provided is empty', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .query({ page: '', limit: 10 })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.haveOwnProperty('error');
          expect(response.body.error).to.be.an('array');
          expect(response.body.error[0]).to.be.an('object');
          expect(response.body.error[0]).to.have.keys(['field', 'message']);
          expect(response.body.error[0].field).to.equal('page');
          expect(response.body.error[0].message).to.equal('page cannot be empty');
          done();
        });
    });

    it('should return an error message if the page number supplied is more than the available pages', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .query({ page: 1000, limit: 10 })
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.haveOwnProperty('message');
          expect(response.body.message).to.be.a('string');
          expect(response.body.message).to.equal('page not found');
          done();
        });
    });

    it('should successfully return the total diagnosis for that page', (done) => {
      chai.request(server)
        .get(DIAGNOSIS_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.keys(['message', 'data']);
          expect(response.body.data).to.have.keys(['diagnosis', 'currentPage', 'totalPages', 'limit']);
          expect(response.body.message).to.be.a('string');
          expect(response.body.data).to.be.an('object');
          expect(response.body.message).to.equal('record successfully retrieved');
          expect(response.body.data.length).to.not.equal(0);
          done();
        });
    });
  });

  describe('GET A DIAGNOSIS RECORD', () => {
    it('should successfully get a diagnosis record', (done) => {
      chai.request(server)
        .get(SINGLE_DIAGNOSIS_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data).to.haveOwnProperty('diagnosis');
          expect(response.body.data.diagnosis).to.be.an('object');
          expect(response.body.data.diagnosis).to.have.keys(['id', 'diagnosisCode', 'fullCode', 'abbreviatedDescription', 'fullDescription', 'categoryId', 'diagnosisCodeType', 'updatedAt', 'createdAt']);
          done();
        });
    });

    it('should not be able to get a diagnosis record if the diagnosis record number invalid', (done) => {
      chai.request(server)
        .get(INVALID_DIAGNOSIS_URL)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('should not be able to get a diagnosis record if the diagnosis record number does not exist', (done) => {
      chai.request(server)
        .get(NOT_FOUND_DIAGNOSIS_URL)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('record not found');
          done();
        });
    });
  });

  describe('DELETE A DIAGNOSIS RECORD', () => {
    it('should successfully delete a diagnosis record', (done) => {
      chai.request(server)
        .delete(SINGLE_DIAGNOSIS_VALID_URL)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.haveOwnProperty('message');
          expect(response.body.message).to.equal('record successfully retrieved');
          done();
        });
    });

    it('should not be able to get a diagnosis record if the diagnosis record number invalid', (done) => {
      chai.request(server)
        .delete(INVALID_DIAGNOSIS_URL)
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('should not be able to get a diagnosis record if the diagnosis record number does not exist', (done) => {
      chai.request(server)
        .delete(NOT_FOUND_DIAGNOSIS_URL)
        .end((error, response) => {
          expect(response).to.have.status(404);
          expect(response.body).to.be.an('object');
          expect(response.body.message).to.equal('record not found');
          done();
        });
    });
  });
});
