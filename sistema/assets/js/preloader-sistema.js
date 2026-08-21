document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar-wrapper a.nav-link[href*='.html']");
  const preloader = document.getElementById("preloader");

  sidebarLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const url = link.getAttribute("href");

      // Mostrar loader animado
      if (preloader) preloader.style.display = "flex";

      // Transición suave antes de redirigir
      setTimeout(() => {
        window.location.href = url;
      }, 800); // 0.8 segundos para que no se sienta lento
    });
  });
});

  if (sidebarVisible) {
  setTimeout(() => {
    sidebar.style.display = "none";
  }, 400);
} else {
  sidebar.style.display = "block";
}
