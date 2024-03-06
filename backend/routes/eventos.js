const express = require('express');
const router = express.Router();
const Evento = require('../models/evento');

// Rota para exibir o formulário de criação de um novo evento
router.get('/novo', (req, res) => {
  res.render('novoEvento');
});

// Rota para exibir todos os eventos na página inicial
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.render('index', { eventos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para exibir os detalhes de um evento específico
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findByPk(id);
    if (evento) {
      res.render('evento', { evento });
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar um novo evento
router.post('/incluir', async (req, res) => {
  try {
    const novoEvento = await Evento.create(req.body);
    res.redirect('/eventos');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
