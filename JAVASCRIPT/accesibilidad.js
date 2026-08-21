// JAVASCRIPT/accesibilidad.js
(() => {
  const KEYS = {
    font: 'acc_font_scale',
    contrast: 'acc_high_contrast',
    dark: 'acc_dark_mode'
  };

  const LIMITS = { min: 0.85, max: 1.35, step: 0.05 };

  // Utilidades
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const $body = document.body;
  const $root = document.documentElement;
  const $iconDark = () => document.getElementById('iconoModoOscuro');

  function getScale() {
    const saved = parseFloat(localStorage.getItem(KEYS.font));
    return isNaN(saved) ? 1 : saved;
  }

  function setScale(scale) {
    const value = clamp(scale, LIMITS.min, LIMITS.max);
    localStorage.setItem(KEYS.font, String(value));
    // Usamos variable CSS para que todo lo que esté en rem/em herede
    $root.style.setProperty('--font-size', `${(value * 100).toFixed(0)}%`);
  }

  function applyContrast(on) {
    $body.classList.toggle('alto-contraste', on);
    localStorage.setItem(KEYS.contrast, on ? '1' : '0');
  }

  function applyDark(on) {
    // Activamos ambas clases para cubrir tus dos esquemas de estilos existentes
    $body.classList.toggle('modo-oscuro', on);
    $body.classList.toggle('dark-background', on);
    localStorage.setItem(KEYS.dark, on ? '1' : '0');

    // Cambia el ícono (luna <-> sol)
    const ico = $iconDark();
    if (ico) {
      ico.classList.remove('bi-moon-stars', 'bi-sun-fill');
      ico.classList.add(on ? 'bi-sun-fill' : 'bi-moon-stars');
    }
  }

  // --- Funciones expuestas (para tus onclick del HTML) ---
  function aumentarLetra() {
    setScale(getScale() + LIMITS.step);
  }

  function reducirLetra() {
    setScale(getScale() - LIMITS.step);
  }

  function toggleContraste() {
    applyContrast(!$body.classList.contains('alto-contraste'));
  }

  function toggleModoOscuro() {
    const isOn = $body.classList.contains('modo-oscuro') || $body.classList.contains('dark-background');
    applyDark(!isOn);
  }

  // Hacerlas globales para que funcionen tus onclick="..."
  window.aumentarLetra = aumentarLetra;
  window.reducirLetra = reducirLetra;
  window.toggleContraste = toggleContraste;
  window.toggleModoOscuro = toggleModoOscuro;

  // Estado inicial al cargar
  document.addEventListener('DOMContentLoaded', () => {
    // Tamaño de fuente
    setScale(getScale());

    // Alto contraste
    const contrastOn = localStorage.getItem(KEYS.contrast) === '1';
    applyContrast(contrastOn);

    // Modo oscuro
    const darkOn = localStorage.getItem(KEYS.dark) === '1';
    applyDark(darkOn);
  });
})();
