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
  