let tipoUsuario = null;
let metodoSeleccionado = null;

document.addEventListener("DOMContentLoaded", function () {
  const pageTransition = document.getElementById("page-transition");

  document.getElementById("form_usuario").addEventListener("submit", manejarEnvioUsuario);
  document.getElementById("form_trabajador").addEventListener("submit", manejarEnvioTrabajador);

  // Inicializar tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Exponer globalmente
  window.mostrarPreloaderYRedirigir = function (url) {
    if (pageTransition) pageTransition.classList.remove("d-none");
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  };
});
function mostrarToastFormato(mensaje) {
  const toastEl = document.getElementById("toastFormato");
  const toastMensaje = document.getElementById("toastFormatoMensaje");
  toastMensaje.textContent = mensaje;
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

function mostrarToastIngreso(mensaje) {
  const toastEl = document.getElementById("toastIngreso");
  const toastMensaje = document.getElementById("toastIngresoMensaje");
  toastMensaje.textContent = mensaje;
  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("bi-eye-slash", "bi-eye");
  }
}

function validarCampos(rut, email, password) {
  return rut && email && password;
}

function validarFormatoRut(rut) {
  const limpio = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  return /^\d{7,8}[0-9K]$/.test(limpio);
}

function mostrarToastFormato(mensaje) {
  const toastEl = document.getElementById("toastFormato");
  const toastMensaje = document.getElementById("toastFormatoMensaje");
  toastMensaje.textContent = mensaje;
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

function mostrarToastIngreso(mensaje) {
  const toastEl = document.getElementById("toastIngreso");
  const toastMensaje = document.getElementById("toastIngresoMensaje");
  toastMensaje.textContent = mensaje;
  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}

function manejarEnvioUsuario(e) {
  e.preventDefault();
  const rut = document.getElementById("usuario_rut").value.trim();
  const email = document.getElementById("usuario_email").value.trim();
  const password = document.getElementById("usuario_pass").value;

  if (!validarCampos(rut, email, password)) {
    mostrarToastFormato("Por favor, completa todos los campos.");
    return;
  }

  if (!validarFormatoRut(rut)) {
    mostrarToastFormato("El RUT ingresado no tiene un formato válido.");
    return;
  }

  tipoUsuario = "usuario";
  new bootstrap.Modal(document.getElementById("modalVerificacion")).show();
}

function manejarEnvioTrabajador(e) {
  e.preventDefault();
  const rut = document.getElementById("trabajador_rut").value.trim();
  const email = document.getElementById("trabajador_email").value.trim();
  const password = document.getElementById("trabajador_pass").value;

  if (!validarCampos(rut, email, password)) {
    mostrarToastFormato("Por favor, completa todos los campos.");
    return;
  }

  if (!validarFormatoRut(rut)) {
    mostrarToastFormato("El RUT ingresado no tiene un formato válido.");
    return;
  }

  tipoUsuario = "trabajador";
  new bootstrap.Modal(document.getElementById("modalVerificacion")).show();
}

function enviarCodigo(metodo) {
  metodoSeleccionado = metodo;

  let texto = "";
  if (metodo === "whatsapp") {
    texto = "Se ha enviado un código a tu WhatsApp.";
  } else if (metodo === "gmail") {
    texto = "Se ha enviado un código a tu correo Gmail.";
  } else if (metodo === "sms") {
    texto = "Se ha enviado un código por SMS.";
  }

  document.getElementById("textoMetodoSeleccionado").textContent = texto;

  const modalVerificacionInstance = bootstrap.Modal.getInstance(document.getElementById("modalVerificacion"));
  modalVerificacionInstance.hide();

  const modalCodigoInstance = new bootstrap.Modal(document.getElementById("modalCodigo"));
  modalCodigoInstance.show();

  // Aquí agregar código para enviar el código de verificación realmente...
  console.log(`Enviar código vía ${metodo} para ${tipoUsuario}`);
}

function verificarCodigo() {
  const codigo = document.getElementById("codigoInput").value.trim();
  if (codigo.length === 0) {
    mostrarToastFormato("Por favor ingresa el código.");
    return;
  }

  // Simulación de verificación exitosa
  mostrarToastIngreso(`Código ${codigo} verificado para ${tipoUsuario}. ¡Ingreso exitoso!`);

  const modalCodigoInstance = bootstrap.Modal.getInstance(document.getElementById("modalCodigo"));
  modalCodigoInstance.hide();

  setTimeout(() => {
    mostrarPreloaderYRedirigir("../sistema/index-sistema.html");
  }, 1800); // Espera un poco más que el toast
}
