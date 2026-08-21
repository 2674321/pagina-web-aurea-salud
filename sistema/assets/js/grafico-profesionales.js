document.addEventListener("DOMContentLoaded", function () {
  const opciones = {
    chart: { type: 'line', height: 250 },
    series: [{
      name: 'Profesionales',
      data: [5, 6, 8, 7, 6, 5, 4]
    }],
    xaxis: {
      categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      labels: { style: { colors: '#000' } }
    },
    stroke: { curve: 'smooth', width: 3, colors: ['#000'] },
    colors: ['#000'],
    dataLabels: { enabled: true },
    tooltip: {
      theme: 'light',
      y: { formatter: val => `${val} activos` }
    },
    grid: { borderColor: '#ddd', strokeDashArray: 4 }
  };

  const container = document.querySelector("#grafico-profesionales");
  if (container) new ApexCharts(container, opciones).render();
});
