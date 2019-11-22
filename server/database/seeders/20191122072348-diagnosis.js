export const up = queryInterface => queryInterface.bulkInsert('Diagnoses', [{
  id: '6a7b986e-1102-4e9a-83b0-cad7df993e1c',
  diagnosisCode: '0',
  fullCode: 'A000',
  abbreviatedDescription: 'Cholera due to Vibrio cholerae 01, biovar cholerae',
  fullDescription: 'Cholera due to Vibrio cholerae 01, biovar cholerae',
  categoryId: 'b1df509c-406b-416e-9c33-734d888e178b',
  diagnosisCodeType: 'icd-10',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '6939dd11-5b9f-4eb9-93a2-a69f14847969',
  diagnosisCode: '1',
  fullCode: 'A001',
  abbreviatedDescription: 'Cholera due to Vibrio cholerae 01, biovar eltor',
  fullDescription: 'Cholera due to Vibrio cholerae 01, biovar eltor',
  categoryId: 'b1df509c-406b-416e-9c33-734d888e178b',
  diagnosisCodeType: 'icd-10',
  createdAt: new Date(),
  updatedAt: new Date()
}], {});
export const down = queryInterface => queryInterface.bulkDelete('Diagnoses', null, {});
