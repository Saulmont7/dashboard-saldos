function preencherTabela(idTabela, dados) {
    const tabela = document.querySelector(`#${idTabela} tbody`);
    tabela.innerHTML = "";
  
    dados.forEach(c => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${c.f0?.$ || "-"}</td>
        <td>R$ ${parseFloat(c.f2?.$ || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
      `;
      tabela.appendChild(linha);
    });
  }
  
function atualizarCardsTotais() {
  const formatar = v => (+v).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const totalGeral = dadosOriginais.reduce((s, c) => s + parseFloat(c.f2?.$ || 0), 0);
  const totalCorrente = contasCorrente.reduce((s, c) => s + parseFloat(c.f2?.$ || 0), 0);
  const totalInvestimento = contasGarantia.reduce((s, c) => s + parseFloat(c.f2?.$ || 0), 0);

  document.getElementById("valorTotalGeral").textContent = formatar(totalGeral);
  document.getElementById("valorTotalCorrente").textContent = formatar(totalCorrente);
  document.getElementById("valorTotalGarantia").textContent = formatar(totalInvestimento);
}