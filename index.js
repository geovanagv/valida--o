const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let pessoas = [];

app.get('/pessoas', (req, res) => {
  res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
  const pessoa = pessoas.find(p => p.id === parseInt(req.params.id));
  if (!pessoa) return res.status(404).json({ message: 'Pessoa não encontrada' });
  res.json(pessoa);
});

app.post('/pessoas', (req, res) => {
  const { nome, idade, email, telefone } = req.body;
  if (!nome || !idade || !email || !telefone) {
    return res.status(400).json({ message: 'Todos os atributos devem ser preenchidos' });
  }
  const pessoa = { id: pessoas.length + 1, nome, idade, email, telefone };
  pessoas.push(pessoa);
  res.status(201).json(pessoa);
});

app.put('/pessoas/:id', (req, res) => {
  const pessoa = pessoas.find(p => p.id === parseInt(req.params.id));
  if (!pessoa) return res.status(404).json({ message: 'Pessoa não encontrada' });
  const { nome, idade, email, telefone } = req.body;
  if (!nome || !idade || !email || !telefone) {
    return res.status(400).json({ message: 'Todos os atributos devem ser preenchidos' });
  }
  pessoa.nome = nome;
  pessoa.idade = idade;
  pessoa.email = email;
  pessoa.telefone = telefone;
  res.json(pessoa);
});

app.delete('/pessoas/:id', (req, res) => {
  const index = pessoas.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Pessoa não encontrada' });
  pessoas.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`http://localhost:3000`);
});
