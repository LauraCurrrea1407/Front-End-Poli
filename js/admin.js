let servicios = JSON.parse(localStorage.getItem("servicios")) || [];

// ================= RENDER =================
function renderTabla() {

  const tabla = document.getElementById("tablaServicios");
  tabla.innerHTML = "";

  servicios.forEach((s, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${s.nombre}</td>
        <td>
          <button class="btn btn-sm btn-warning"
            onclick="editar(${index})">Editar</button>

          <button class="btn btn-sm btn-danger"
            onclick="eliminar(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// ================= GUARDAR =================
function guardarServicio() {

  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const img = document.getElementById("img").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  // VALIDACIÓN
  if (!nombre || !descripcion || !img) {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (editIndex === "") {

    // NUEVO
    servicios.push({
      id: Date.now(),
      nombre,
      descripcion,
      img
    });

  } else {

    // EDITAR
    servicios[editIndex] = {
      ...servicios[editIndex],
      nombre,
      descripcion,
      img
    };

  }

  localStorage.setItem("servicios", JSON.stringify(servicios));

  limpiarForm();
  renderTabla();
}

// ================= EDITAR =================
function editar(index) {

  const s = servicios[index];

  document.getElementById("nombre").value = s.nombre;
  document.getElementById("descripcion").value = s.descripcion;
  document.getElementById("img").value = s.img;
  document.getElementById("editIndex").value = index;
}

// ================= ELIMINAR =================
function eliminar(index) {

  if (confirm("¿Eliminar servicio?")) {
    servicios.splice(index, 1);
    localStorage.setItem("servicios", JSON.stringify(servicios));
    renderTabla();
  }
}

// ================= LIMPIAR =================
function limpiarForm() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("img").value = "";
  document.getElementById("editIndex").value = "";
}

// ================= INIT =================
renderTabla();