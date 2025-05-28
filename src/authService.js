const repositorioUsuario = require('./repositorioUsuario');

async function registerUser(name, email, password) {
    if (!name || !email || !password) throw new Error('Campos obrigatórios');
    const existing = await repositorioUsuario.findByEmail(email);
    if (existing) throw new Error('E-mail já cadastrado');
    const user = await repositorioUsuario.create({
        name,
        email,
        password: hashPassword(password)
    });
    return user;
}

function hashPassword(password) {

    // Simples para os testes
    return 'hashed' + password;
}

async function loginUser(email, password) {
    if (!email || !password) throw new Error('Campos obrigatórios');
    const user = await repositorioUsuario.findByEmail(email);
    if (!user) throw new Error('E-mail ou senha inválidos');
    if (!verifyPassword(password, user.password)) throw new Error('E-mail ou senha inválidos');
    return user;
}

function verifyPassword(password, hash) {
    return hash == hashPassword(password);
}

module.exports = { registerUser, loginUser, verifyPassword };