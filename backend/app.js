const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let tenis = []; // Banco de dados temporário

// Listar todos
app.get("/tenis", (req, res) => res.json(tenis));

// Buscar um específico (para edição)
app.get("/tenis/:id", (req, res) => {
    const item = tenis.find(t => t.id == req.params.id);
    item ? res.json(item) : res.status(404).send("Não encontrado");
});

// Adicionar
app.post("/tenis", (req, res) => {
    const novo = { ...req.body, id: Date.now() };
    tenis.push(novo);
    res.status(201).json(novo);
});

// Editar
app.put("/tenis/:id", (req, res) => {
    const { id } = req.params;
    const index = tenis.findIndex(t => t.id == id);
    if (index !== -1) {
        tenis[index] = { ...tenis[index], ...req.body };
        return res.json(tenis[index]);
    }
    res.status(404).send("Erro ao editar");
});

// Excluir
app.delete("/tenis/:id", (req, res) => {
    tenis = tenis.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.listen(3000, () => console.log("✅ API rodando na porta 3000"));