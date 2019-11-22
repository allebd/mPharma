export const up = queryInterface => queryInterface.bulkInsert('DiagnosisCategories', [{
  id: 'b1df509c-406b-416e-9c33-734d888e178b',
  categoryCode: 'A00',
  categoryTitle: 'Cholera',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '41f73a8a-0d6c-48ba-9cb1-4179cfd4a94b',
  categoryCode: 'A01',
  categoryTitle: 'Typhoid and paratyphoid fevers',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '5378b578-5413-4657-961f-e7a5ab1c4597',
  categoryCode: 'A010',
  categoryTitle: 'Typhoid fever',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '27d670c9-2189-415b-b86f-3353dee9f1c9',
  categoryCode: 'A011',
  categoryTitle: 'Paratyphoid fever A',
  createdAt: new Date(),
  updatedAt: new Date()
}], {});
export const down = queryInterface => queryInterface.bulkDelete('DiagnosisCategories', null, {});
