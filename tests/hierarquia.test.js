const { criarHierarquia, buscarSuperior, buscarSubordinados } = require('../src/hierarquia');

// para rodar só esse arquivo escreva no terminal:

// npx jest tests/hierarquia.test.js

describe('Hierarquia', () => {
    let hierarquia;

    beforeEach(() => {
        hierarquia = criarHierarquia([
            { id: 1, nome: 'ADM geral', superiorId: null },
            { id: 2, nome: 'ADM', superiorId: 1 },
            { id: 3, nome: 'Capitão', superiorId: 2 },
            { id: 4, nome: 'Jogador', superiorId: 3 },
        ]);
    });

    // Capitão maior que jogador
    
    //Troque o Capitão para alguma coisa para falhar
    test('deve encontrar o superior de um jogador', () => {
        const superior = buscarSuperior(hierarquia, 4);
        expect(superior.nome).toBe('Capitão');
    });

    //ADM geral não tem ninguém acima dele

    test('deve retornar null se não houver superior', () => {
        const superior = buscarSuperior(hierarquia, 1);
        expect(superior).toBeNull();
    });

    //ADM deve ser maior que Capitão e Jogador

    test('deve encontrar subordinados diretos', () => {
        const subordinados = buscarSubordinados(hierarquia, 1);
        const nomes = subordinados.map(s => s.nome);
        expect(nomes).toEqual(expect.arrayContaining(['ADM']));
    });

    // Jogador não deve ter ninguém abaixo, menor cargo.
    
    // Coloque algum cargo dentro do toEqual([]), para dar erro.
    test('deve retornar lista vazia se não houver subordinados', () => {
        const subordinados = buscarSubordinados(hierarquia, 4);
        expect(subordinados).toEqual([]);
    });

    // Dar erro caso coloque um cargo alto que não existe.

    test('deve lançar erro ao buscar superior de id inexistente', () => {
        expect(() => buscarSuperior(hierarquia, 999)).toThrow();
    });

    // dar erro caso não bata com nenhum cargo.

    test('deve lançar erro ao buscar usuário de id inexistente', () => {
        expect(() => buscarSubordinados(hierarquia, 999)).toThrow();
    });
});