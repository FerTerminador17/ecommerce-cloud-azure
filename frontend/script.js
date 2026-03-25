const API_URL = "http://localhost:3000/tenis";

const form = document.getElementById("form");
const tenisIdInput = document.getElementById("tenis-id");
const btnSalvar = document.getElementById("btn-salvar");

async function carregarTenis() {
    const res = await fetch(API_URL);
    const dados = await res.json();
    const vitrine = document.getElementById("vitrine");
    vitrine.innerHTML = "";

    dados.forEach(t => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${t.foto}" alt="Tênis">
            <h3>${t.nome}</h3>
            <p>${t.marca} - ${t.tipo}</p>
            <b>R$ ${parseFloat(t.preco).toFixed(2)}</b>
            <div class="card-actions">
                <button class="btn-editar" onclick="prepararEdicao(${t.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirTenis(${t.id})">Excluir</button>
            </div>
        `;
        vitrine.appendChild(card);
    });
}

async function excluirTenis(id) {
    if (confirm("Remover este tênis?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        carregarTenis();
    }
}

async function prepararEdicao(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const t = await res.json();
    tenisIdInput.value = t.id;
    document.getElementById("nome").value = t.nome;
    document.getElementById("marca").value = t.marca;
    document.getElementById("preco").value = t.preco;
    document.getElementById("foto").value = t.foto;
    document.getElementById("tipo").value = t.tipo;
    btnSalvar.textContent = "Salvar Mudanças";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = tenisIdInput.value;
    const dados = {
        nome: document.getElementById("nome").value,
        marca: document.getElementById("marca").value,
        preco: document.getElementById("preco").value,
        foto: document.getElementById("foto").value,
        tipo: document.getElementById("tipo").value
    };

    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    form.reset();
    tenisIdInput.value = "";
    btnSalvar.textContent = "Adicionar Drop";
    carregarTenis();
});

carregarTenis();