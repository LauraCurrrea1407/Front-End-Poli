fetch('data/servicios.json')
  .then(res => res.json())
  .then(servicios => {

    
    const container = document.getElementById("serviciosContainer");

    servicios.forEach(s => {
      container.innerHTML += `
        <div class="col-md-3 mb-4">
          <div class="card shadow-sm h-100">
            <img src="${s.img}" class="card-img-top">
            <div class="card-body text-center d-flex flex-column">
              <h6>${s.nombre}</h6>

              <div class="mt-auto">
                <a href="detalle-servicio.html?id=${s.id}" class="btn btn-dark btn-sm w-100 mb-2">
                  Ver Detalle
                </a>

                <button class="btn btn-orange btn-sm w-100"
                  onclick="agregarFavorito(${s.id})">
                  ❤️ Favorito
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

  });