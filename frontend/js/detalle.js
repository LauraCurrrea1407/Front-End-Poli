// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Obtener servicios desde localStorage
let servicios = JSON.parse(localStorage.getItem('servicios')) || [];

// Buscar el servicio
const servicio = servicios.find(s => s.id === id);

const container = document.getElementById("detalleContainer");

// Si no existe
if (!servicio) {
  container.innerHTML = "<p>Servicio no encontrado</p>";
} else {

  container.innerHTML = `
    <div class="row align-items-center">

      <div class="col-md-6">
        <img src="${servicio.img}" class="img-fluid rounded shadow">
      </div>

      <div class="col-md-6">
        <h2 class="fw-bold">${servicio.nombre}</h2>
        <p class="mt-3">${servicio.descripcion}</p>

        <ul class="mt-3">
          <li>✔ Diagnóstico profesional</li>
          <li>✔ Garantía del servicio</li>
          <li>✔ Atención rápida</li>
        </ul>

        <div class="mt-4">
          <button class="btn btn-orange me-2"
            onclick="agregarFavorito(${servicio.id})">
            ❤️ Agregar a favoritos
          </button>

          <a href="mis-solicitudes.html" class="btn btn-dark">
            Solicitar Servicio
          </a>
        </div>
      </div>

    </div>
  `;
  if (servicios.length === 0) {
  fetch('data/servicios.json')
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('servicios', JSON.stringify(data));
      location.reload();
    });
}
}