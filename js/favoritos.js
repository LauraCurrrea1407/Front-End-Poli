function agregarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  let servicios = JSON.parse(localStorage.getItem('servicios')) || [];

  const servicio = servicios.find(s => s.id === id);

  if (!favoritos.find(f => f.id === id)) {
    favoritos.push(servicio);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert("✅ Agregado a favoritos");
  } else {
    alert("⚠️ Ya está en favoritos");
  }
}

function renderFavoritos() {
  const container = document.getElementById('favoritosContainer');
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  container.innerHTML = '';

  if (favoritos.length === 0) {
    container.innerHTML = `
      <div class="text-center">
        <h5>No tienes favoritos aún 😢</h5>
        <a href="servicios.html" class="btn btn-orange mt-3">
          Ver servicios
        </a>
      </div>
    `;
    return;
  }

  favoritos.forEach(s => {
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card shadow-sm h-100">

          <img src="${s.img}" class="card-img-top" alt="${s.nombre}">

          <div class="card-body d-flex flex-column">
            <h5>${s.nombre}</h5>
            <p class="text-muted">${s.descripcion || ''}</p>

            <div class="mt-auto">
              <button class="btn btn-danger w-100 mb-2"
                onclick="eliminarFavorito(${s.id})">
                <i class="bi bi-trash"></i> Eliminar
              </button>

              <button class="btn btn-outline-secondary w-100"
                onclick="verDetalle(${s.id})">
                Ver detalle
              </button>
            </div>

          </div>

        </div>
      </div>
    `;
  });
}

// ================= ELIMINAR =================
function eliminarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  favoritos = favoritos.filter(f => f.id !== id);

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  renderFavoritos();
}

// ================= DETALLE =================
function verDetalle(id) {
  window.location.href = `detalle-servicio.html?id=${id}`;
}

// ================= INIT =================
renderFavoritos();