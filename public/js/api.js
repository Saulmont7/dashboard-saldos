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
    contasGarantia = dados.filter(c => c.f3?.$ === "GARANTIA");
    

    console.log("✅ Dados carregados");
  } catch (erro) {
    console.error("Erro ao carregar dados da API:", erro);
  }
}

function inicializarDashboard() {
  console.log("corrente:", contasCorrente);
  console.log("garantia:", contasGarantia);
  preencherTabela("tabelaCorrente", contasCorrente);
  preencherTabela("tabelaGarantia", contasGarantia);
  gerarGraficoColunas();
  gerarGraficoDonut();
}
