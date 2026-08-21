document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector("[data-lte-toggle='sidebar']");
  const sidebar = document.querySelector(".app-sidebar");
  const main = document.querySelector(".app-main");
  const footer = document.querySelector(".app-footer");

  let sidebarVisible = true;

  toggleBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (sidebarVisible) {
      sidebar.classList.remove("slide-in");
      sidebar.classList.add("slide-out");

      main.style.marginLeft = "0";
      footer.style.marginLeft = "0";

    } else {
      sidebar.classList.remove("slide-out");
      sidebar.classList.add("slide-in");

      main.style.marginLeft = "250px";
      footer.style.marginLeft = "250px";
    }

    sidebarVisible = !sidebarVisible;
  });
});
