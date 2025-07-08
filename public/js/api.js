console.log("✅ API.js executando");

let contasCorrente = [];
let contasGarantia = [];
let dadosOriginais = [];

document.addEventListener("DOMContentLoaded", async () => {
  await carregarDadosSankhya();
  console.log("✅ API carregada"); // Teste
  inicializarDashboard();
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

function popularFiltroContas() {
  const select = document.getElementById("filtroContas");

  const opcoesUnicas = [...new Set(dadosOriginais.map(c => c.f0.$))];
  opcoesUnicas.forEach(desc => {
    const option = document.createElement("option");
    option.value = desc;
    option.textContent = desc;
    option.selected = true; // todas selecionadas por padrão
    select.appendChild(option);
  });

  // Reage a mudanças no filtro
  select.addEventListener("change", () => {
    const selecionadas = Array.from(select.selectedOptions).map(opt => opt.value);

    contasCorrente = dadosOriginais.filter(c => c.f3?.$ === "CORRENTE" && selecionadas.includes(c.f0.$));
    contasGarantia = dadosOriginais.filter(c => c.f3?.$ === "INVESTIMENTO" && selecionadas.includes(c.f0.$));

    inicializarDashboard(); // re-renderiza tudo
  });
}

function inicializarDashboard() {
  console.log("corrente:", contasCorrente);
  console.log("garantia:", contasGarantia);
  preencherTabela("tabelaCorrente", contasCorrente);
  preencherTabela("tabelaGarantia", contasGarantia);
  gerarGraficoColunas();
  gerarGraficoDonut();
  atualizarCardsTotais();
  popularFiltroContas();
}
