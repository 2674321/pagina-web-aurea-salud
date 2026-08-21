document.addEventListener("DOMContentLoaded", function () {
  if (typeof ApexCharts !== 'undefined') {
    const opcionesGrafico = {
      chart: {
        type: 'area',
        height: 300,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      series: [{
        name: 'Visitas Realizadas',
        data: [10, 14, 12, 20, 18, 25, 22]
      }],
      xaxis: {
        categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        title: {
          text: 'Días de la Semana',
          style: { color: '#6c757d' }
        },
        labels: {
          style: {
            colors: '#6c757d',
            fontSize: '13px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Cantidad de Visitas',
          style: { color: '#6c757d' }
        },
        labels: {
          style: {
            colors: '#6c757d',
            fontSize: '13px'
          }
        },
        min: 0
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.4,
          gradientToColors: ['#0d6efd'],
          inverseColors: false,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
          colors: ["#000"]
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          borderRadius: 2,
          padding: 4,
          opacity: 0.9
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['#0d6efd']
      },
      markers: {
        size: 5,
        colors: ['#ffffff'],
        strokeColor: '#0d6efd',
        strokeWidth: 3,
        hover: {
          size: 7
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: val => `${val} visitas`
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -10,
        labels: {
          colors: '#6c757d'
        }
      },
      grid: {
        borderColor: '#e0e0e0',
        row: {
          colors: ['#f8f9fa', 'transparent'], 
          opacity: 0.5
        }
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 250
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chartContainer = document.querySelector("#grafico-atencion-clinica");
    if (chartContainer) {
      const grafico = new ApexCharts(chartContainer, opcionesGrafico);
      grafico.render();
    } else {
      console.error("No se encontró el contenedor del gráfico.");
    }
  } else {
    console.error("ApexCharts no está definido.");
  }
});
