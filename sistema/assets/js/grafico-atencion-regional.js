document.addEventListener("DOMContentLoaded", function () {
  const selector = document.getElementById("selector-comuna");
  const chartElement = document.querySelector("#grafico-atencion-regional");

  const dataPorComuna = {
    coquimbo: [12, 18, 20, 14, 22, 17, 19],
    la_serena: [10, 15, 18, 13, 20, 16, 14],
    ovalle: [8, 11, 9, 10, 13, 12, 10],
    andacollo: [5, 6, 4, 7, 6, 5, 4],
  };

  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

let opciones = {
  chart: {
    type: "line",
    height: 260,
    toolbar: { show: false },
  },
  series: [{
    name: "Atenciones",
    data: dataPorComuna["coquimbo"],
  }],
  xaxis: {
    categories: diasSemana,
    title: { text: "Día de la semana" },
  },
  yaxis: {
    title: { text: "N° de atenciones" },
  },
  colors: ["#ffffff"],
  stroke: {
    curve: "smooth",
    width: 3,
  },
  markers: {
    size: 5,
    colors: ["#ffffff"],
    strokeColor: "#007bff",
    strokeWidth: 2,
  },
  grid: {
    borderColor: "#cccccc",
  },
  theme: {
    mode: "light", // Cambia a "dark" si usas fondo oscuro
  },
  tooltip: {
    theme: "dark", // <-- Este es el cambio clave
    y: {
      formatter: function (val) {
        return val + " atenciones";
      }
    }
  }
};

  let chart = new ApexCharts(chartElement, opciones);
  chart.render();

  // Cambio dinámico al seleccionar comuna
  selector.addEventListener("change", function () {
    const comunaSeleccionada = this.value;
    const nuevaData = dataPorComuna[comunaSeleccionada] || [];
    chart.updateSeries([{ name: "Atenciones", data: nuevaData }]);
  });
});
