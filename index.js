const express = require('express');
const path = require('path');
const sequelize = require('./backend/config/database.js');
const eventosRoutes = require('./backend/routes/eventos.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Redirecionar para a página de eventos na raiz
app.get('/', (req, res) => {
  res.redirect('/eventos');
});

app.use('/eventos', eventosRoutes);

sequelize.sync().then(() => {
  console.log('Conexão com o banco de dados estabelecida.');

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});