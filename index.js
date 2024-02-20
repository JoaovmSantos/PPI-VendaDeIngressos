import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';

const host='localhost'; 
const porta = 3000;  

const app = express();

app.use(express.urlencoded({extended: true})); 

app.use(session({
    secret: 'M1nH4Ch4v3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {  
        maxAge: 60 * 1000 * 120
    }
}))

app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha   = requisicao.body.senha;
    if (usuario && senha && usuario === 'Joao' && senha === '1234'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/cadastroCliente.html');
    }
    else{
        resposta.redirect('/login.html');
    }
})

app.post('/cadastrar', (req, res)=>{
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  if(usuario && senha && usuario === 'Joao' && senha === '1234'){
    req.session.usuarioLogado = true;
    res.redirect('/ingressosMais.html');
  }else{
    res.redirect('/cadastroCliente.html')
  }
})

app.get('/ingressosMais', (req, res)=>{
  const usuario = req.body.usuario;
  const senha = req.body.senha;
  if(usuario && senha && usario === 'Joao' && senha === '1234'){
    req.session.usuarioLogado = true;
    res.redirect('/musicfest.html');
  }else{
    res.redirect('ingressoMais.html');
  }
})

//O express oferece funcionalidades para permitir que conteúdo estático seja fornecido
app.use(express.static(path.join(process.cwd(), 'publico')));

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})