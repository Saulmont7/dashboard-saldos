function gerarGraficoDonut() {
    const ctxCorrente = document.getElementById("graficoDonutCorrente").getContext("2d");
    const ctxGarantia = document.getElementById("graficoDonutGarantia").getContext("2d");
  
    // Donut de contas corrente por conta
    new Chart(ctxCorrente, {
      type: "doughnut",
      data: {
        labels: contasCorrente.map(c => c.f0?.$),
        datasets: [{
          data: contasCorrente.map(c => parseFloat(c.f2?.$ || 0)),
          backgroundColor: contasCorrente.map((_, i) => gerarCor(i)),
          cutout: "70%"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 4,
              generateLabels: (chart) => {
                const data = chart.data;
                const total = data.datasets[0].data.reduce((sum, val) => sum + Number(val), 0);
          
                return data.labels.map((label, i) => {
                  const value = Number(data.datasets[0].data[i]);
                  const percentual = ((value / total) * 100).toFixed(1);
                  return {
                    text: `${label} (${percentual}%)`,
                    fillStyle: data.datasets[0].backgroundColor[i],
                    strokeStyle: data.datasets[0].backgroundColor[i],
                    lineWidth: 1,
                    index: i
                  };
                });
              }
            }
          },
          layout: {
            padding: {
              top: 0,
              bottom: 0 // 🔧 evita espaço extra na parte inferior
            }
          },
          title: {
            display: true,
          }
        }
      }
    });
  
    // Donut de contas garantia por conta
    new Chart(ctxGarantia, {
      type: "doughnut",
      data: {
        labels: contasGarantia.map(c => c.f0?.$),
        datasets: [{
          data: contasGarantia.map(c => parseFloat(c.f2?.$ || 0)),
          backgroundColor: contasGarantia.map((_, i) => gerarCor(i)),
          cutout: "70%"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 4,
              generateLabels: (chart) => {
                const data = chart.data;
                const total = data.datasets[0].data.reduce((sum, val) => sum + Number(val), 0);
          
                return data.labels.map((label, i) => {
                  const value = Number(data.datasets[0].data[i]);
                  const percentual = ((value / total) * 100).toFixed(1);
                  return {
                    text: `${label} (${percentual}%)`,
                    fillStyle: data.datasets[0].backgroundColor[i],
                    strokeStyle: data.datasets[0].backgroundColor[i],
                    lineWidth: 1,
                    index: i
                  };
                });
              }
            }
          },
          layout: {
            padding: {
              top: 0,
              bottom: 0 // 🔧 evita espaço extra na parte inferior
            }
          },
          title: {
            display: true,
          }
        }
      }
    });
  }
  
  function gerarCor(i) {
    const cores = [
      "#4caf50", "#fbc02d", "#03a9f4", "#ff9800", "#e91e63",
      "#9c27b0", "#009688", "#cddc39", "#795548", "#607d8b"
    ];
    return cores[i % cores.length];
  }
  