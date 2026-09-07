import express from 'express';

const app = express();

const PORT = 3000;

const usuarios = [
    {id: 1, nome: "Kauã"},
    {id: 2, nome: "Enzo"},
    {id: 3, nome: "Larissa menez"}
];

const produtos = [
    {id: 1, nome: "Teclado", categoria: "periferico"},
    {id: 2, nome: "Mouse", categoria: "periferico"},
    {id: 3, nome: "Monitor", categoria: "monitor"},
    {id: 4, nome: "Headset", categoria: "periferico"}
];

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
        return res.status(404).json({
            error: 'Usuario não encontrado!'
        });
    };

    res.status(200).json(usuario);
});


app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const produto = produtos.find(
        p => p.id === id
    );

    if (!produto) {
        return res.status(404).json({
            error: 'Produto não encontrado!'
        });
    }

    res.status(200).json(produto);
});


app.get('/produtos', (req, res) => {
    const categoria = req.query.categoria;

    const produtosFiltrados = produtos.filter(
        p => p.categoria === categoria
    );

    res.status(200).json(produtosFiltrados);
});


app.listen(PORT, () => {
    console.log(
        `servidor rodando em http://localhost:${PORT}`
    );
});