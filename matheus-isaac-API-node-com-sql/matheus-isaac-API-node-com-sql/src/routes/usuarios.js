const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /usuarios - lista todos os usuários
router.get('/', async (req, res) => {
  try {
    const [usuarios] = await db.query(
      'SELECT id, nome, email FROM usuarios ORDER BY id'
    );
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// POST /usuarios - cadastra um usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Informe nome e email.' });
    }

    const [resultado] = await db.execute(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );

    return res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso.',
      id: resultado.insertId,
      nome,
      email
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ mensagem: 'Este email já está cadastrado.' });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// PUT /usuarios/:id - atualiza um usuário
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Informe nome e email.' });
    }

    const [resultado] = await db.execute(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ mensagem: 'Este email já está cadastrado.' });
    }
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// DELETE /usuarios/:id - exclui um usuário
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await db.execute(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

module.exports = router;
