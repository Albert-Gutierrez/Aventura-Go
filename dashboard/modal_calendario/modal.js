// ======== VARIABLES ========
const abrir = document.getElementById('abrirModalViaje');
const cerrar = document.getElementById('cerrarModalViaje');
const modal = document.getElementById('modalViaje');

const diasGrid = document.getElementById('diasGrid');
const tituloMes = document.getElementById('tituloMes');
const prevMes = document.getElementById('prevMes');
const nextMes = document.getElementById('nextMes');
const selectHora = document.getElementById('horaLlegada');
const salidaTexto = document.getElementById('seleccion');

// ======== CALENDARIO ========
let fechaActual = new Date(); // fecha del sistema
let mes = fechaActual.getMonth(); // 0 = Enero
let anio = fechaActual.getFullYear();

const meses = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
];

// Generar días del mes actual
function generarCalendario() {
  diasGrid.innerHTML = '';
  tituloMes.textContent = `${meses[mes]}, ${anio}`;

  const primerDia = new Date(anio, mes, 1).getDay(); // día de la semana del 1
  const ultimoDia = new Date(anio, mes + 1, 0).getDate(); // total de días del mes

  // Rellenar espacios vacíos antes del día 1 (para cuadrar la cuadrícula)
  const offset = primerDia === 0 ? 6 : primerDia - 1;
  for (let i = 0; i < offset; i++) {
    const span = document.createElement('span');
    span.classList.add('vacio');
    diasGrid.appendChild(span);
  }

  // Agregar los días
  for (let d = 1; d <= ultimoDia; d++) {
    const span = document.createElement('span');
    span.classList.add('dia');
    span.textContent = d;
    span.addEventListener('click', () => seleccionarDia(span, d));
    diasGrid.appendChild(span);
  }
}

function seleccionarDia(elemento, dia) {
  document.querySelectorAll('.dia').forEach(el => el.classList.remove('seleccionado'));
  elemento.classList.add('seleccionado');
  actualizarSeleccion(dia);
}

function actualizarSeleccion(dia) {
  const horaSeleccionada = selectHora.value;
  if (dia && horaSeleccionada) {
    salidaTexto.textContent = `Ingreso: ${dia} de ${meses[mes]} de ${anio} – ⏰ ${horaSeleccionada}`;
  }
}

// Navegación entre meses
prevMes.addEventListener('click', () => {
  mes--;
  if (mes < 0) {
    mes = 11;
    anio--;
  }
  generarCalendario();
});

nextMes.addEventListener('click', () => {
  mes++;
  if (mes > 11) {
    mes = 0;
    anio++;
  }
  generarCalendario();
});

// Actualizar cuando cambia la hora
selectHora.addEventListener('change', () => {
  const diaSeleccionado = document.querySelector('.dia.seleccionado');
  if (diaSeleccionado) {
    actualizarSeleccion(diaSeleccionado.textContent);
  }
});

// ======== MODAL ========
abrir.addEventListener('click', () => modal.classList.add('activo'));
cerrar.addEventListener('click', () => modal.classList.remove('activo'));

// Inicializar
generarCalendario();
