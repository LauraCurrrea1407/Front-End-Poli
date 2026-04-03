let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
let editId = null;

// Modal Bootstrap
const modal = new bootstrap.Modal(document.getElementById('modal'));

// ================= RENDER =================
function renderSolicitudes() {
  const tabla = document.getElementById('tablaSolicitudes');
  tabla.innerHTML = '';

  const filtro = document.getElementById('filtroEstado').value;
  let lista = solicitudes;

  if (filtro !== 'Todos') {
    lista = solicitudes.filter(s => s.estado === filtro);
  }

  if (lista.length === 0) {
    tabla.innerHTML = `<tr><td colspan="5" class="text-center py-3">No hay solicitudes</td></tr>`;
    actualizarEstadisticas();
    return;
  }

  lista.forEach(s => {

    let badge = '';
    switch (s.estado) {
      case 'Pendiente':
        badge = 'bg-warning text-dark';
        break;
      case 'En Progreso':
        badge = 'bg-primary';
        break;
      case 'Editada':
        badge = 'bg-secondary';
        break;
      case 'Cancelada':
        badge = 'bg-danger';
        break;
      case 'Solucionada':
        badge = 'bg-success';
        break;
      default:
        badge = 'bg-dark';
    }

    tabla.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.servicio}</td>
        <td>
          <span class="badge ${badge}">${s.estado}</span>
        </td>
        <td>${s.fecha}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary me-1" onclick="editarSolicitud(${s.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="cancelarSolicitud(${s.id})">
            <i class="bi bi-x-circle"></i>
          </button>
        </td>
      </tr>
    `;
  });

  actualizarEstadisticas();
}

// ================= GUARDAR =================
function guardarLocalStorage() {
  localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
}

// ================= ABRIR MODAL =================
document.getElementById('btnAgregar').addEventListener('click', () => {
  document.getElementById('modalTitulo').textContent = 'Nueva Solicitud';
  document.getElementById('formSolicitud').reset();
  editId = null;
  modal.show();
});

// ================= FORM =================
document.getElementById('formSolicitud').addEventListener('submit', (e) => {
  e.preventDefault();

  const servicio = document.getElementById('servicio').value;
  const detalles = document.getElementById('detalles').value;
  const datosExtra = document.getElementById('datosExtra').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  if (!servicio || !detalles || !datosExtra || !fecha || !hora) {
    alert('Completa todos los campos');
    return;
  }

  if (editId !== null) {
    solicitudes = solicitudes.map(s =>
      s.id === editId
        ? { ...s, servicio, detalles, datosExtra, fecha, hora, estado: 'Editada' }
        : s
    );
  } else {
    solicitudes.push({
      id: Date.now(),
      servicio,
      detalles,
      datosExtra,
      fecha,
      hora,
      estado: 'Pendiente'
    });
  }

  guardarLocalStorage();
  renderSolicitudes();
  modal.hide();
});

// ================= EDITAR =================
function editarSolicitud(id) {
  const s = solicitudes.find(s => s.id === id);
  if (!s) return;

  editId = id;

  document.getElementById('modalTitulo').textContent = 'Editar Solicitud';
  document.getElementById('servicio').value = s.servicio;
  document.getElementById('detalles').value = s.detalles;
  document.getElementById('datosExtra').value = s.datosExtra;
  document.getElementById('fecha').value = s.fecha;

  cargarHoras(s.fecha, s.hora);

  modal.show();
}

// ================= CANCELAR =================
function cancelarSolicitud(id) {
  if (confirm('¿Cancelar solicitud?')) {
    solicitudes = solicitudes.map(s =>
      s.id === id ? { ...s, estado: 'Cancelada' } : s
    );
    guardarLocalStorage();
    renderSolicitudes();
  }
}

// ================= FILTRO =================
document.getElementById('filtroEstado').addEventListener('change', renderSolicitudes);

// ================= ESTADÍSTICAS =================
function actualizarEstadisticas() {
  const totales = { Pendiente: 0, 'En Progreso': 0, Solucionada: 0, Cancelada: 0 };

  solicitudes.forEach(s => {
    totales[s.estado] = (totales[s.estado] || 0) + 1;
  });

  document.getElementById('totalActivas').textContent = totales['Pendiente'];
  document.getElementById('totalEnProgreso').textContent = totales['En Progreso'];
  document.getElementById('totalCompletadas').textContent = totales['Solucionada'];
  document.getElementById('totalCanceladas').textContent = totales['Cancelada'];
}

// ================= HORARIOS =================
const franjas = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

document.getElementById('fecha').addEventListener('change', (e) => {
  cargarHoras(e.target.value);
});

function cargarHoras(fecha, horaSeleccionada = null) {
  const select = document.getElementById('hora');
  select.innerHTML = '<option value="">Selecciona</option>';

  const ocupados = solicitudes
    .filter(s => s.fecha === fecha)
    .map(s => s.hora);

  franjas.forEach(h => {
    if (!ocupados.includes(h) || h === horaSeleccionada) {
      const opt = document.createElement('option');
      opt.value = h;
      opt.textContent = h;

      if (h === horaSeleccionada) opt.selected = true;

      select.appendChild(opt);
    }
  });
}

// ================= INIT =================
renderSolicitudes();