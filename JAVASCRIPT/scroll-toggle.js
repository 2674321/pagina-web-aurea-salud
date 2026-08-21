window.addEventListener('load', () => { // Espera a que toda la página cargue
  const btn = document.getElementById('scroll-toggle');
  const icon = document.getElementById('scroll-icon');

  if (!btn || !icon) return;

  const getScroll = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  const getMaxScroll = () => {
    const doc = document.documentElement;
    const body = document.body;
    const height = Math.max(
      doc.scrollHeight, body.scrollHeight,
      doc.offsetHeight, body.offsetHeight,
      doc.clientHeight, body.clientHeight
    );
    return Math.max(0, height - window.innerHeight);
  };

  function refresh() {
    const pos = getScroll();
    const max = getMaxScroll();

    // Mostrar el botón si la página tiene scroll suficiente y no estamos arriba
    if(max > 0 && pos > 20){
      btn.classList.add('visible');
      btn.setAttribute('aria-hidden', 'false');
    } else {
      btn.classList.remove('visible');
      btn.setAttribute('aria-hidden', 'true');
    }

    const midpoint = max / 2;
    if(pos < midpoint){
      icon.className = 'bi bi-arrow-down-short';
      btn.setAttribute('aria-label', 'Ir al final de la página');
      btn.setAttribute('data-tooltip', 'Bajar');
    } else {
      icon.className = 'bi bi-arrow-up-short';
      btn.setAttribute('aria-label', 'Ir al inicio de la página');
      btn.setAttribute('data-tooltip', 'Subir');
    }
  }

  let animating = false;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if(animating) return;
    const pos = getScroll();
    const max = getMaxScroll();
    const midpoint = max / 2;
    let target = pos < midpoint ? max : 0;

    animating = true;
    window.scrollTo({ top: target, behavior: 'smooth' });

    // desbloquear después del scroll estimado
    const distance = Math.abs(target - pos);
    const estimated = Math.min(1600, 300 + distance * 0.6);
    setTimeout(() => { animating = false; refresh(); }, estimated);
  });

  // accesibilidad teclado
  btn.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click();
    }
  });

  // refresh al hacer scroll, resize y orientation change
  window.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh);
  window.addEventListener('orientationchange', refresh);

  // inicializar al cargar contenido
  refresh();
});
