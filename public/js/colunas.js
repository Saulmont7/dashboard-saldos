function gerarGraficoColunas() {
    const ctxCorrente = document.getElementById("graficoColunasCorrente").getContext("2d");
    const ctxGarantia = document.getElementById("graficoColunasGarantia").getContext("2d");

    if (window.colunaChartCorrente) window.colunaChartCorrente.destroy();
    if (window.colunaChartGarantia) window.colunaChartGarantia.destroy();

    // Gráfico de Contas Corrente
    window.colunaChartCorrente = new Chart(ctxCorrente, {
      type: "bar",
      data: {
        labels: contasCorrente.map(c => c.f0.$),
        datasets: [{
          label: "Saldo Corrente",
          data: contasCorrente.map(c => parseFloat(c.f2.$ || 0)),
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `R$ ${value.toLocaleString("pt-BR")}`
            }
          }
        }
      }
    });
  
    // Gráfico de Contas Garantia
    window.colunaChartGarantia = new Chart(ctxGarantia, {
      type: "bar",
      data: {
        labels: contasGarantia.map(c => c.f0.$),
        datasets: [{
          label: "Saldo Garantia",
          data: contasGarantia.map(c => parseFloat(c.f2.$ || 0)),
          backgroundColor: "rgba(255, 159, 64, 0.7)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `R$ ${value.toLocaleString("pt-BR")}`
            }
          }
        }
      }
    });
  }
  