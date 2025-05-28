const create = require('./create');

test('Aviso adicionado com sucesso!', () => {
  expect(create("Toda terça-feira teremos um Switch Break na sala W501. Te esperamos lá!")).toBe("Toda terça-feira teremos um Switch Break na sala W501. Te esperamos lá!");
});