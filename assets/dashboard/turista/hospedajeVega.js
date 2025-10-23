document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedorHospedajes");
  const buscador = document.getElementById("buscador");
  const btnBuscar = document.getElementById("btnBuscar");

  let hospedajes = [];

  // Cargar datos desde JSON
  fetch("../assets/dashboard/data/hospedajeVega.json")
    .then((res) => res.json())
    .then((data) => {
      hospedajes = data;
      mostrarHospedajes(hospedajes);
    })
    .catch((err) => console.error("Error cargando hospedajes:", err));

  // Mostrar tarjetas dinámicamente
  function mostrarHospedajes(lista) {
    contenedor.innerHTML = "";
    lista.forEach((h) => {
      const col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");

      col.innerHTML = `
        <div class="card-hospedaje" data-id="${h.id}">
          <img src="${h.imagen}" alt="Imagen hospedaje"><!-- Aquí va tu imagen -->
          <div class="card-body-custom">
            <h5 class="card-titulo">${h.titulo}</h5>
            <p class="card-resena">⭐ ${h.reseñas} (${h.opiniones} opiniones)</p>
            <p>${h.noches} Noches, ${h.dias} Días</p>
            <p class="card-precio">Desde $${h.precio}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(col);

      col.querySelector(".card-hospedaje").addEventListener("click", () => abrirModal(h));
    });
  }

  // Modal
  const modalTitulo = document.getElementById("modalTitulo");
  const modalImagen = document.getElementById("modalImagen");
  const modalDescripcion = document.getElementById("modalDescripcion");
  const modalNoches = document.getElementById("modalNoches");
  const modalDias = document.getElementById("modalDias");
  const modalPrecio = document.getElementById("modalPrecio");
  const btnReservar = document.getElementById("btnReservar");

  function abrirModal(hospedaje) {
    modalTitulo.textContent = hospedaje.titulo;
    modalImagen.src = hospedaje.imagen;
    modalDescripcion.textContent = hospedaje.descripcion;
    modalNoches.textContent = hospedaje.noches;
    modalDias.textContent = hospedaje.dias;
    modalPrecio.textContent = hospedaje.precio;

    btnReservar.onclick = () => {
      window.location.href = "reservar.html"; // redirige a tu página futura
    };

    const modal = new bootstrap.Modal(document.getElementById("modalHospedaje"));
    modal.show();
  }

  // Buscar hospedaje
  btnBuscar.addEventListener("click", () => {
    const texto = buscador.value.toLowerCase();
    const filtrados = hospedajes.filter((h) =>
      h.titulo.toLowerCase().includes(texto)
    );
    mostrarHospedajes(filtrados);
  });
});
