const { registerUser, loginUser } = require('../src/authService'); // Ajuste o caminho conforme sua estrutura
const repositorioUsuario = require('../src/repositorioUsuario'); // Mock do repositório
const authService = require('../src/authService');

// para rodar só esse arquivo escreva no terminal:

// tests/login.test.js


jest.mock('../src/repositorioUsuario');

describe('User Registration', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //muda algo para testar falha 

    it('Verificar se é possível cadastrar um usuário com dados válidos', async () => {
        repositorioUsuario.findByEmail.mockResolvedValue(null);
        repositorioUsuario.create.mockResolvedValue({ id: 1, name: 'Alice', email: 'alice@mail.com' });

        const user = await registerUser('Alice', 'alice@mail.com', 'senha123');
        expect(user).toHaveProperty('id');
        expect(user.name).toBe('Alice');
        expect(user.email).toBe('alice@mail.com');
    });

    //muda algo para testar falha 

    it('Verificar se o sistema impede o cadastro com e-mail já existente', async () => {
        repositorioUsuario.findByEmail.mockResolvedValue({ id: 2, email: 'bob@mail.com' });

        await expect(
            registerUser('Bob', 'bob@mail.com', 'senha123')
        ).rejects.toThrow('E-mail já cadastrado');
    });

    //muda algo para testar falha 

    it('Garantir que o login seja possível com credenciais válidas', async () => {
        await expect(registerUser('', 'test@mail.com', 'pass')).rejects.toThrow();
        await expect(registerUser('Test', '', 'pass')).rejects.toThrow();
        await expect(registerUser('Test', 'test@mail.com', '')).rejects.toThrow();
    });
});

describe('User Login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Trocar algo para testar falha

    it('Garantir que o login seja possível com credenciais válidas', async () => {
        repositorioUsuario.findByEmail.mockResolvedValue({
            id: 1,
            email: 'alice@mail.com',
            password: 'hashedsenha123', // Supondo hash
        });
        // Mock de verificação de senha
        jest.spyOn(authService, 'verifyPassword').mockReturnValue(true);

        const user = await loginUser('alice@mail.com', 'senha123');
        expect(user).toHaveProperty('id');
        expect(user.email).toBe('alice@mail.com');
    });

    it('Falhar com email inválido', async () => {
        repositorioUsuario.findByEmail.mockResolvedValue(null);

        await expect(
            loginUser('notfound@mail.com', 'senha123')
        ).rejects.toThrow('E-mail ou senha inválidos');
    });

    it('Falhar com senha invalida', async () => {
        repositorioUsuario.findByEmail.mockResolvedValue({
            id: 1,
            email: 'alice@mail.com',
            password: 'hashedsenha123',
        });
        jest.spyOn(authService, 'verifyPassword').mockReturnValue(false);

        await expect(
            loginUser('alice@mail.com', 'wrongpassword')
        ).rejects.toThrow('E-mail ou senha inválidos');
    });

    // Trocar algo para testar falha

    it('Verificar que os campos obrigatórios são validados corretamente', async () => {
        await expect(loginUser('', 'senha123')).rejects.toThrow();
        await expect(loginUser('alice@mail.com', '')).rejects.toThrow();
    });
});