console.log("✅ API.js executando");

let contasCorrente = [];
let contasGarantia = [];
let dadosOriginais = [];

document.addEventListener("DOMContentLoaded", async () => {
  await carregarDadosSankhya();
  console.log("✅ API carregada"); // Teste
  popularFiltroCheckboxes(); // <-- novo: gera os checkboxes
  inicializarDashboard();
  aplicarFiltroPorCheckbox();
});

document.getElementById("toggleFiltro").addEventListener("click", () => {
  const filtro = document.getElementById("filtroCheckboxes");
  const btn = document.getElementById("toggleFiltro");

  if (filtro.style.display === "none") {
    filtro.style.display = "block";
    btn.textContent = "🔽 Ocultar Filtro";
  } else {
    filtro.style.display = "none";
    btn.textContent = "▶ Mostrar Filtro";
  }
});

async function carregarDadosSankhya() {
  try {
    const response = await fetch("/api/saldos");
    const data = await response.json();
    const dados = data.entity || [];
    
    dadosOriginais = dados;
    contasCorrente = dados.filter(c => c.f3?.$ === "CORRENTE");
    contasGarantia = dados.filter(c => c.f3?.$ === "INVESTIMENTO");
    

    console.log("✅ Dados carregados");
  } catch (erro) {
    console.error("Erro ao carregar dados da API:", erro);
  }
}

function popularFiltroCheckboxes() {
  const container = document.getElementById("filtroCheckboxes");
  container.innerHTML = ""; // limpa

  const opcoesUnicas = [...new Set(dadosOriginais.map(c => c.f0.$))];

  opcoesUnicas.forEach(desc => {
    const label = document.createElement("label");
    label.style.display = "block";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = desc;
    checkbox.checked = true;

    checkbox.addEventListener("change", aplicarFiltroPorCheckbox);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + desc));
    container.appendChild(label);
  });
}

function aplicarFiltroPorCheckbox() {
  const checkboxes = document.querySelectorAll("#filtroCheckboxes input[type='checkbox']");
  const selecionadas = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  contasCorrente = dadosOriginais.filter(
    c => c.f3?.$ === "CORRENTE" && selecionadas.includes(c.f0.$)
  );

  contasGarantia = dadosOriginais.filter(
    c => c.f3?.$ === "INVESTIMENTO" && selecionadas.includes(c.f0.$)
  );
  inicializarDashboard();
}


function inicializarDashboard() {
  console.log("corrente:", contasCorrente);
  console.log("garantia:", contasGarantia);
  preencherTabela("tabelaCorrente", contasCorrente);
  preencherTabela("tabelaGarantia", contasGarantia);
  gerarGraficoColunas();
  gerarGraficoDonut();
  atualizarCardsTotais();
}
