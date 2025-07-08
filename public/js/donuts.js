function gerarGraficoDonut() {
  const ctxDonutCorrente = document.getElementById("graficoDonutCorrente").getContext("2d");
  const ctxDonutInvestimento = document.getElementById("graficoDonutGarantia").getContext("2d");

  if (window.donutChartCorrente) window.donutChartCorrente.destroy();
  if (window.donutChartGarantia) window.donutChartGarantia.destroy();

  const getDonutData = (dados) => {
    const labels = dados.map(c => c.f0.$);
    const valores = dados.map(c => Math.abs(parseFloat(c.f2.$)));
    const total = valores.reduce((a, b) => a + b, 0);

    return {
      labels,
      data: valores,
      legend: labels.map((label, i) => `${label} (${((valores[i] / total) * 100).toFixed(1)}%)`)
    };
  };

  const corrente = getDonutData(contasCorrente);
  const garantia = getDonutData(contasGarantia);

  window.donutChartCorrente = new Chart(ctxDonutCorrente, {
    type: 'doughnut',
    data: {
      labels: corrente.labels,
      datasets: [{
        data: corrente.data,
        backgroundColor: corrente.labels.map((_, i) => `hsl(${i * 40}, 70%, 60%)`)
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { generateLabels: () => corrente.legend.map((text, i) => ({ text, fillStyle: `hsl(${i * 40}, 70%, 60%)` })) }
        }
      }
    }
  });

  window.donutChartGarantia = new Chart(ctxDonutInvestimento, {
    type: 'doughnut',
    data: {
      labels: garantia.labels,
      datasets: [{
        data: garantia.data,
        backgroundColor: garantia.labels.map((_, i) => `hsl(${i * 40}, 70%, 60%)`)
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { generateLabels: () => garantia.legend.map((text, i) => ({ text, fillStyle: `hsl(${i * 40}, 70%, 60%)` })) }
        }
      }
    }
  });
}
