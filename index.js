import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';

const host='localhost'; //O ip 0.0.0.0 representa todas as interfaces (placas de rede) do computador onde essa aplicação for executada
const porta = 3000;  //Porta identifica um programa em execução no host hospedeiro

const app = express();

app.use(express.urlencoded({extended: true})); //biblioteca qs

//gerencie uma sessão como sendo uma espécie de memória adquirida pelo servidor para lembrar com quem ele conversa
app.use(session({
    secret: 'M1nH4Ch4v3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {  
        maxAge: 60 * 1000 * 15
    }
}))



app.post('/login', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario && senha && usuario === 'Joao' && senha === '1234') {
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/cadastro');
    } else {
        resposta.redirect('/login.html');
    }
});

app.get('/ingressosMais', (requisicao, resposta) => {
    resposta.sendFile(path.join(process.cwd(), 'ingressosMais.html'));
});

//O express oferece funcionalidades para permitir que conteúdo estático seja fornecido
app.use(express.static(path.join(process.cwd(), 'publico')));

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})