// overlayscrollbars config
const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
const Default = {
  scrollbarTheme: 'os-theme-light',
  scrollbarAutoHide: 'leave',
  scrollbarClickScroll: true,
};
document.addEventListener('DOMContentLoaded', function () {
  const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
  if (sidebarWrapper && typeof OverlayScrollbarsGlobal?.OverlayScrollbars !== 'undefined') {
    OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
      scrollbars: {
        theme: Default.scrollbarTheme,
        autoHide: Default.scrollbarAutoHide,
        clickScroll: Default.scrollbarClickScroll,
      },
    });
  }

  // sortablejs config
  const connectedSortables = document.querySelectorAll('.connectedSortable');
  connectedSortables.forEach((connectedSortable) => {
    new Sortable(connectedSortable, {
      group: 'shared',
      handle: '.card-header',
    });
  });

  const cardHeaders = document.querySelectorAll('.connectedSortable .card-header');
  cardHeaders.forEach((cardHeader) => {
    cardHeader.style.cursor = 'move';
  });

  // ApexCharts: Revenue Chart
  const sales_chart_options = {
    series: [
      { name: 'Digital Goods', data: [28, 48, 40, 19, 86, 27, 90] },
      { name: 'Electronics', data: [65, 59, 80, 81, 56, 55, 40] },
    ],
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
    },
    legend: { show: false },
    colors: ['#0d6efd', '#20c997'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: [
        '2023-01-01',
        '2023-02-01',
        '2023-03-01',
        '2023-04-01',
        '2023-05-01',
        '2023-06-01',
        '2023-07-01',
      ],
    },
    tooltip: {
      x: { format: 'MMMM yyyy' },
    },
  };
  new ApexCharts(document.querySelector('#revenue-chart'), sales_chart_options).render();

  // jsvectormap
  new jsVectorMap({
    selector: '#world-map',
    map: 'world',
  });

  // Sparklines
  const sparklineOptions = (data) => ({
    series: [{ data }],
    chart: { type: 'area', height: 50, sparkline: { enabled: true } },
    stroke: { curve: 'straight' },
    fill: { opacity: 0.3 },
    yaxis: { min: 0 },
    colors: ['#DCE6EC'],
  });

  new ApexCharts(document.querySelector('#sparkline-1'), sparklineOptions([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021])).render();
  new ApexCharts(document.querySelector('#sparkline-2'), sparklineOptions([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921])).render();
  new ApexCharts(document.querySelector('#sparkline-3'), sparklineOptions([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21])).render();
});
