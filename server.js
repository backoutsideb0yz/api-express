const app = express();
const PORT = 3000;

let tarefas = [
    {id: 1, nome: "Estudar Node.js", concluida: false},
    {id: 2, nome: "Estudar React", concluida: false},
    {id: 3, nome: "Estudar Express", concluida: true}
]

app.get('/', (req, res) => {
    res.send('API de tarefas no Ar');
});

app.get('/tarefas', (req, res) => {
    const {concluida} = req.query;

    if (concluida === undefined) {
        return res.json(tarefas);
    }

    const filtroConcluida = concluida === "true";
    const tarefasFiltradas = tarefas.filter(
    (tarefa) => tarefa.concluida === filtroConcluida
);

    res.json(tarefasFiltradas);
});

app.get("tarefas/:id", (req, res) => {
    const id = number(req.params.id);
    const tarefa = tarefas.find((t) => t.id === id);

    if(!tarefa) {
        return res.status(404)
    }

    res.json(tarefa);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body || {};

  if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
    return res.status(400).json({ erro: 'O campo "titulo" é obrigatório' });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    concluida: false,
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
