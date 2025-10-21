const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('navbarNav');

toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

// carrusel slick automatico
$(document).ready(function () {

    $('.slider-testimonios').slick({
        slidesToShow: 3,       // Número de cards visibles a la vez
        slidesToScroll: 1,     // Cuántas se mueven por clic
        infinite: true,        // Que sea infinito
        arrows: true,          // Muestra flechas
        dots: true,            // Muestra los puntitos de navegación
        autoplay: true,        // Activa autoplay
        autoplaySpeed: 3000,   // Velocidad del autoplay en ms
        responsive: [
            {
                breakpoint: 1024, // Tablets y laptops pequeñas
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768, // Celulares grandes
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

});


// flechas prev y next
$('.slider-testimonios').slick({
    dots: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 992,
            settings: { slidesToShow: 2 }
        },
        {
            breakpoint: 768,
            settings: { slidesToShow: 1 }
        }
    ]
});
