let serviciosGlobal = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarServicios();
});

// ================= CARGA INTELIGENTE =================
function cargarServicios() {

  let servicios = JSON.parse(localStorage.getItem("servicios"));

  // (admin)
  if (servicios && servicios.length > 0) {

    serviciosGlobal = servicios;
    renderServicios(servicios);

  } else {

    // (JSON)
    fetch('data/servicios.json')
      .then(res => res.json())
      .then(data => {

        localStorage.setItem("servicios", JSON.stringify(data));

        serviciosGlobal = data;
        renderServicios(data);
      });
  }
}

// ================= RENDER =================
function renderServicios(lista) {
  const container = document.getElementById("serviciosContainer");
  container.innerHTML = "";

  lista.forEach(s => {
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card shadow-sm h-100">
          <img src="${s.img}" class="card-img-top">

          <div class="card-body d-flex flex-column">
            <h5>${s.nombre}</h5>
            <p>${s.descripcion}</p>

            <div class="mt-auto">
              <a href="detalle-servicio.html?id=${s.id}" class="btn btn-dark w-100 mb-2">
                Ver Detalle
              </a>

              <button class="btn btn-orange w-100 mb-2"
                onclick="agregarFavorito(${s.id})">
                <i class="bi bi-bookmark"></i> Guardar
              </button>

              <a href="mis-solicitudes.html" class="btn btn-outline-primary w-100">
                Solicitar
              </a>
            </div>
          </div>

        </div>
      </div>
    `;
  });
}

// ================= BUSCADOR =================
document.getElementById("buscador").addEventListener("keyup", e => {
  const texto = e.target.value.toLowerCase();

  const filtrados = serviciosGlobal.filter(s =>
    s.nombre.toLowerCase().includes(texto)
  );

  renderServicios(filtrados);
});