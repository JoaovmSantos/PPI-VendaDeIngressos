import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt'; 
import autenticar from './seguranca/autenticar.js';

const host = 'localhost';
const porta = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'M1nH4Ch4v3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15
    }
}));

// Simulando um "banco de dados" com um array de usuários
const usuarios = [];

// Função para verificar se a senha é válida
const verificarSenha = async (senhaDigitada, senhaHash) => {
    return await bcrypt.compare(senhaDigitada, senhaHash);
};

// Rota de cadastro
app.post('/cadastrar', async (requisicao, resposta) => {
    const { nome, email, senha, confirmarSenha } = requisicao.body;

    // Verifica se o email já está cadastrado
    if (usuarios.some(usuario => usuario.email === email)) {
        resposta.status(400).send('Email já cadastrado');
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        resposta.status(400).send('As senhas não coincidem');
        return;
    }

    // Hash da senha antes de armazenar
    const senhaHash = await bcrypt.hash(senha, 10); // Ajuste o custo conforme necessário

    // Cria um novo usuário e adiciona ao "banco de dados"
    const novoUsuario = {
        nome,
        email,
        senha: senhaHash,
    };

    usuarios.push(novoUsuario);

    // Define o usuário como autenticado na sessão
    requisicao.session.usuarioLogado = true;

    // Redireciona para a página de eventos após o cadastro bem-sucedido
    resposta.redirect('/index.html');
});

// Rota de login
app.post('/login', async (requisicao, resposta) => {
    const { email, senha } = requisicao.body;

    // Encontra o usuário pelo email
    const usuario = usuarios.find(u => u.email === email);

    // Verifica se o usuário existe e se a senha está correta
    if (usuario && await verificarSenha(senha, usuario.senha)) {
        // Define o usuário como autenticado na sessão
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/index.html');
    } else {
        resposta.redirect('/login.html');
    }
});

// O express oferece funcionalidades para permitir que conteúdo estático seja fornecido
app.use(express.static(path.join(process.cwd(), 'publico')));

// Protege a rota de eventos
app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
