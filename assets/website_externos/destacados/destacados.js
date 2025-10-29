document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor-tours');

  fetch('../assets/website_externos/destacados/tours.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el JSON");
      }
      return response.json();
    })
    .then(tours => {
      tours.forEach(tour => {
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
    })
    .catch(error => {
      console.error("Error cargando los tours:", error);
    });
});
