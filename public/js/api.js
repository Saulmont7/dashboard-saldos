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

function aplicarFiltroContas() {
  const input = document.getElementById("filtroContas");
  const termo = input.value.toLowerCase();

  // Aplica o filtro SEMPRE a partir dos dados originais completos
  contasCorrente = dadosOriginais.filter(c =>
    c.f3?.$ === "CORRENTE" && c.f0?.$.toLowerCase().includes(termo)
  );

  contasGarantia = dadosOriginais.filter(c =>
    c.f3?.$ === "INVESTIMENTO" && c.f0?.$.toLowerCase().includes(termo)
  );

  preencherTabela("tabelaCorrente", contasCorrente);
  preencherTabela("tabelaGarantia", contasGarantia);
  gerarGraficoColunas();
  gerarGraficoDonut();
}

function inicializarDashboard() {
  console.log("corrente:", contasCorrente);
  console.log("garantia:", contasGarantia);
  preencherTabela("tabelaCorrente", contasCorrente);
  preencherTabela("tabelaGarantia", contasGarantia);
  gerarGraficoColunas();
  gerarGraficoDonut();
  atualizarCardsTotais();
  aplicarFiltroContas();
}
