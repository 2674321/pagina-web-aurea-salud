function closeAllDropdowns(except = null, parent = document) {
  parent.querySelectorAll(".dropdown.active").forEach((drop) => {
    if (drop !== except) drop.classList.remove("active");
  });
}

document.querySelectorAll("#navmenu .dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const parentLi = this.closest(".dropdown");

    // Cierra solo hermanos del mismo nivel
    const siblingScope = parentLi.parentElement;
    closeAllDropdowns(parentLi, siblingScope);

    parentLi.classList.toggle("active");
  });
});

// Cierra el menú completo si se hace clic fuera
document.addEventListener("click", function (e) {
  if (!e.target.closest("#navmenu")) {
    closeAllDropdowns();
  }
});

(function () {
  "use strict";

  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");
    if (
      !header.classList.contains("scroll-up-sticky") &&
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  // Eliminar submenús horizontales, forzar a vertical
  document
    .querySelectorAll(".navmenu .dropdown .dropdown-menu")
    .forEach((menu) => {
      menu.classList.remove("sub-menu");
    });
    
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  new PureCounter();

  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let configElement = swiperElement.querySelector(".swiper-config");
      let config;
      try {
        config = JSON.parse(configElement.innerHTML.trim());
      } catch (e) {
        console.error("Invalid Swiper config", e);
        return;
      }

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  window.addEventListener("load", function () {
    if (window.location.hash) {
      let section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const card = question.closest(".faq-card");
    card.classList.toggle("open");

    // Cierra los demás
    document.querySelectorAll(".faq-card").forEach((other) => {
      if (other !== card) {
        other.classList.remove("open");
      }
    });
  });
});

const video = document.getElementById("aboutVideo");
const btnSoundToggle = document.getElementById("btnSoundToggle");

btnSoundToggle.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    btnSoundToggle.textContent = "🔊";
    btnSoundToggle.setAttribute("aria-label", "Silenciar sonido");
  } else {
    video.muted = true;
    btnSoundToggle.textContent = "🔇";
    btnSoundToggle.setAttribute("aria-label", "Activar sonido");
  }
});
