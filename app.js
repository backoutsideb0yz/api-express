import express from 'express';

const app = express();

const PORT = 3000;

const usuarios = [
    {id: 1, nome: "Kauã"},
    {id: 2, nome: "Enzo"},
    {id: 3, nome: "Larissa menez"}
]

app.get('/', (req, res) => {
    res.send('Bem vindo ao express!');
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {

    const novoUsuario = {
        id: usuarios.length + 1,
        nome: 'Henrique'
    }

    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(
        u => u.id === parseInt(id)
    );

    if (!usuario) {
        return res.status(404).json({error: 'Usuario não encontrado!'});
    };
    res.status(200).json(usuarios)
});

app.listen(PORT, () => {
    console.log(
        `servidor rodando em http://localhost:${PORT}`
    );
});