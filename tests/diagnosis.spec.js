import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import mockData from './mockData';

chai.use(chaiHttp);

const { diagnosisMock } = mockData;
const { validDiagnosis, invalidDiagnosis } = diagnosisMock;

const BASE_URL = '/api/v1';
const DIAGNOSIS_VALID_URL = `${BASE_URL}/diagnosis`;

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
});
