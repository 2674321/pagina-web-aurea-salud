document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  if (!preloader) return; // seguridad, si no existe

  // Función para ocultar el preloader
  const hidePreloader = () => {
    if (!preloader.classList.contains("hidden")) {
      preloader.classList.add("hidden");
      document.body.removeAttribute("aria-busy");
    }
  };

  // Marca el body como ocupado
  document.body.setAttribute("aria-busy", "true");

  // 1) Ocultrar apenas el DOM ya esté listo (garantizado)
  setTimeout(hidePreloader, 1200);

  // 2) Escuchar el evento load (si todo se carga más lento)
  window.addEventListener("load", () => {
    setTimeout(hidePreloader, 300);
  });

  // 3) Forzar de seguridad (si nada de lo anterior funciona)
  setTimeout(hidePreloader, 6000);
});
