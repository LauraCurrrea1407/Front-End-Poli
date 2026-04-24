document.querySelector("form").addEventListener("submit", function(e) {

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !correo || !mensaje) {
    e.preventDefault();
    alert("Todos los campos son obligatorios");
    return;
  }

  if (!correo.includes("@")) {
    e.preventDefault();
    alert("Correo inválido");
    return;
  }

  alert("Mensaje enviado correctamente");
});