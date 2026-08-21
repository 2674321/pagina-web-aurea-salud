document.addEventListener("DOMContentLoaded", function () {
  const opciones = {
    chart: { type: 'bar', height: 250 },
    series: [{
      name: 'Visitas',
      data: [25, 18, 12, 5]
    }],
    xaxis: {
      categories: ['La Serena', 'Coquimbo', 'Ovalle', 'Andacollo'],
      labels: { style: { colors: '#ffffff' } }
    },
    colors: ['#ffffff'],
    dataLabels: { enabled: false },
    grid: { borderColor: 'rgba(255,255,255,0.2)' },
    tooltip: { theme: 'dark', y: { formatter: val => `${val} visitas` } }
  };

  const container = document.querySelector("#grafico-cobertura");
  if (container) new ApexCharts(container, opciones).render();
});
