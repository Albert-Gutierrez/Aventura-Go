
const modoOscuroBtn = document.getElementById('modoOscuroBtn');
const notificacionesBtn = document.getElementById('notificacionesBtn');
const input = document.getElementById('buscarReserva');
const contenedor = document.getElementById('reservasContainer');
let reservas = [];

// para activar modo oscuro
modoOscuroBtn.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
});

// boton listo para recibir notificaciones (ejemplo)
notificacionesBtn.addEventListener('click', () => {
    alert("🔔 Tienes nuevas notificaciones");
});


// 1. Cargar el archivo JSON
fetch('../../assets/data/historial_reservas.json')
    .then(res => res.json())
    .then(data => {
        reservas = data; // Guardamos los datos en la variable global
        mostrarReservas(reservas); // Mostramos todas al cargar la página
    })
    .catch(error => console.error("Error cargando JSON:", error));


// 2. Función para mostrar las reservas en pantalla
function mostrarReservas(lista) {
    contenedor.innerHTML = '';

    lista.forEach(r => {
        const div = document.createElement('div');
        div.classList.add('reserva');
        div.innerHTML = `
        <button class="ver">ver</button>
        <p><strong>Fecha:</strong> ${r.fecha}</p>
        <p><strong>${r.lugar}</strong></p>
        <p><strong>$${r.precio.toLocaleString()}</strong></p>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Filtrar al escribir o al hacer clic
function filtrarReservas() {
    const filtro = input.value.toLowerCase();
    const filtradas = reservas.filter(r =>
        r.lugar.toLowerCase().includes(filtro) ||
        r.fecha.includes(filtro)
    );
    mostrarReservas(filtradas);
}

input.addEventListener('keyup', filtrarReservas);
boton.addEventListener('click', filtrarReservas);






