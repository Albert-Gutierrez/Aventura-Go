document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-tours');
  const botonBuscar = document.querySelector('.btn-buscar');
  const inputBusqueda = document.getElementById('input-busqueda');

  let toursGuardados = []; // guardaremos los tours cargados

  // Cargar tours desde el JSON
  fetch('../assets/website_externos/destacados/tours.json')
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar el JSON");
      return response.json();
    })
    .then(tours => {
      toursGuardados = tours; // guardamos para poder filtrar después
      mostrarTours(toursGuardados);
    })
    .catch(error => console.error("Error cargando los tours:", error));

  // Función para mostrar los tours
  function mostrarTours(lista) {
    contenedor.innerHTML = ''; // limpiar
    if (lista.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    lista.forEach(tour => {
      const card = document.createElement('div');
      card.classList.add('tarjeta-tour');

      card.innerHTML = `
        <img src="${tour.img}" alt="${tour.titulo}">
        <div class="tour-info">
          <h3>${tour.titulo}</h3>
          <div class="tour-rating">
            ⭐⭐⭐⭐⭐ <span>(1 Review)</span>
          </div>
          <p><strong>${tour.tipo}</strong></p>
          <p>${tour.descripcion}</p>
          <p class="tour-precio">${tour.precio}</p>
        </div>
      `;
      contenedor.appendChild(card);
    });
  }

  // Evento para buscar
  botonBuscar.addEventListener('click', () => {
    const texto = inputBusqueda.value.toLowerCase().trim();
    const filtrados = toursGuardados.filter(tour =>
      tour.titulo.toLowerCase().includes(texto) ||
      tour.tipo.toLowerCase().includes(texto)
    );
    mostrarTours(filtrados);
  });
});
