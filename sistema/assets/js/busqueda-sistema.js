document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("btn-toggle-search");
  const container = document.getElementById("search-container");
  const input = document.getElementById("search-input");

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.toggle("expanded");

    if (container.classList.contains("expanded")) {
      input.classList.remove("d-none");
      setTimeout(() => input.focus(), 100);
    } else {
      input.classList.add("d-none");
      input.value = "";
    }
  });

  // Cierra si se hace clic fuera
  document.addEventListener("click", function (e) {
    if (!container.contains(e.target) && !toggleBtn.contains(e.target)) {
      container.classList.remove("expanded");
      input.classList.add("d-none");
      input.value = "";
    }
  });
});
