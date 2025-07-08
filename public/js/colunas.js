function gerarGraficoColunas() {
  const ctxCorrente = document.getElementById("graficoColunasCorrente").getContext("2d");
  const ctxInvestimento = document.getElementById("graficoColunasGarantia").getContext("2d");

  if (window.colunaChartCorrente) window.colunaChartCorrente.destroy();
  if (window.colunaChartGarantia) window.colunaChartGarantia.destroy();

  window.colunaChartCorrente = new Chart(ctxCorrente, {
    type: 'bar',
    data: {
      labels: contasCorrente.map(c => c.f0.$),
      datasets: [{
        label: 'Saldo',
        data: contasCorrente.map(c => parseFloat(c.f2.$)),
        backgroundColor: '#007bff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  window.colunaChartGarantia = new Chart(ctxInvestimento, {
    type: 'bar',
    data: {
      labels: contasGarantia.map(c => c.f0.$),
      datasets: [{
        label: 'Saldo',
        data: contasGarantia.map(c => parseFloat(c.f2.$)),
        backgroundColor: '#28a745'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
