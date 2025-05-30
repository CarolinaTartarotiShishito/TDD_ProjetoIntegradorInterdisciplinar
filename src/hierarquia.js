module.exports = {
    criarHierarquia,
    buscarSuperior,
    buscarSubordinados
};

function criarHierarquia(funcionarios) {
    // Cria um mapa de funcionários por id para acesso rápido
    const mapa = new Map();
    funcionarios.forEach(f => mapa.set(f.id, { ...f }));

    // Adiciona subordinados a cada funcionário
    funcionarios.forEach(f => {
        if (f.superiorId !== null) {
            const superior = mapa.get(f.superiorId);
            if (!superior.subordinados) superior.subordinados = [];
            superior.subordinados.push(mapa.get(f.id));
        }
    });

    // Retorna o mapa como objeto para facilitar busca
    return {
        funcionarios: mapa,
        lista: funcionarios
    };
}

function buscarSuperior(hierarquia, id) {
    const funcionario = hierarquia.funcionarios.get(id);
    if (!funcionario) throw new Error('Funcionário não encontrado');
    if (funcionario.superiorId === null) return null;
    const superior = hierarquia.funcionarios.get(funcionario.superiorId);
    return superior || null;
}

function buscarSubordinados(hierarquia, id) {
    const funcionario = hierarquia.funcionarios.get(id);
    if (!funcionario) throw new Error('Funcionário não encontrado');
    return funcionario.subordinados || [];
}
