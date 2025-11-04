// ------------------- CONFIGURACIONES GENERALES -------------------
const today = new Date(); // Fecha actual real
today.setHours(0, 0, 0, 0); // Normalizar horas

// Rango de años: año actual + 2 años posteriores
const currentYear = today.getFullYear();
const maxYear = currentYear + 2;

// Variables de estado
let currentDate = new Date();
let startDate = null;
let endDate = null;
let selectingStart = true; // true = eligiendo fecha de entrada, false = salida

// Elementos del DOM
const calendar = document.getElementById("calendar");
const openBtn = document.getElementById("openCalendarBtn");
const dateText = document.getElementById("dateText");
const currentLabel = document.getElementById("currentLabel");
const calendarDays = document.getElementById("calendarDays");
const monthGrid = document.getElementById("monthGrid");
const yearGrid = document.getElementById("yearGrid");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


// ------------------- ABRIR / CERRAR CALENDARIO -------------------
openBtn.addEventListener("click", () => {
    calendar.classList.toggle("hidden");
    openBtn.setAttribute("aria-expanded", calendar.classList.contains("hidden") ? "false" : "true");
    showMonth();
});

// Cierra si clic fuera
document.addEventListener("click", (e) => {
    if (!calendar.contains(e.target) && !openBtn.contains(e.target)) {
        calendar.classList.add("hidden");
        openBtn.setAttribute("aria-expanded", "false");
    }
});



// ------------------- FORMATOS DE TEXTO -------------------
const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function formatDate(d) {
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Calcular noches
function getNights() {
    if (!startDate || !endDate) return 0;
    const diff = endDate - startDate;
    return diff / (1000 * 60 * 60 * 24);
}

// Actualizar texto del botón
function updateButtonText() {
    if (!startDate && !endDate) {
        dateText.textContent = "Fecha de entrada — Fecha de salida";
        return;
    }
    if (startDate && !endDate) {
        dateText.textContent = `${formatDate(startDate)} — Selecciona salida`;
        return;
    }
    const nights = getNights();
    dateText.textContent = `${formatDate(startDate)} — ${formatDate(endDate)} · ${nights} noches`;
}



// ------------------- MOSTRAR DIAS -------------------
function showMonth() {
    monthGrid.classList.add("hidden");
    yearGrid.classList.add("hidden");
    calendarDays.classList.remove("hidden");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    currentLabel.textContent = `${months[month]} ${year}`;

    calendarDays.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Espacios iniciales
    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div></div>`;
    }

    // Crear días
    for (let d = 1; d <= daysInMonth; d++) {
        const dayDate = new Date(year, month, d);
        dayDate.setHours(0, 0, 0, 0);

        let disabled = dayDate < today; // Bloquea días pasados

        // Bloquear si supera los 2 años
        if (year > maxYear || (year === maxYear && month > 11)) {
            disabled = true;
        }

        const isSelected =
            startDate && dayDate.getTime() === startDate.getTime() ||
            endDate && dayDate.getTime() === endDate.getTime();

        calendarDays.innerHTML += `
            <div class="day ${disabled ? "disabled" : ""} ${isSelected ? "selected" : ""}"
            data-day="${d}"
            data-month="${month}"
            data-year="${year}">
        ${d}
        </div>`;
    }
}

// ------------------- EVENTO CLICK EN DIA -------------------
calendarDays.addEventListener("click", (e) => {
    if (!e.target.classList.contains("day") || e.target.classList.contains("disabled")) return;

    const d = parseInt(e.target.dataset.day);
    const m = parseInt(e.target.dataset.month);
    const y = parseInt(e.target.dataset.year);

    const selected = new Date(y, m, d);
    selected.setHours(0, 0, 0, 0);

    if (selectingStart) {
        startDate = selected;
        endDate = null;
        selectingStart = false;
    } else {
        if (selected <= startDate) {
            startDate = selected;
            endDate = null;
        } else {
            endDate = selected;
            selectingStart = true;
            calendar.classList.add("hidden"); // cerrar calendario
        }
    }

    updateButtonText();
    showMonth();
});



// ------------------- VISTA DE MESES -------------------
currentLabel.addEventListener("click", () => {
    if (!calendarDays.classList.contains("hidden")) {
        showMonths();
    } else if (!monthGrid.classList.contains("hidden")) {
        showYears();
    }
});

function showMonths() {
    calendarDays.classList.add("hidden");
    yearGrid.classList.add("hidden");
    monthGrid.classList.remove("hidden");

    monthGrid.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        const disabled = currentDate.getFullYear() === currentYear && i < today.getMonth();

        monthGrid.innerHTML += `
        <div class="month-cell ${disabled ? "disabled" : ""}" data-month="${i}">
        ${months[i]}
        </div>`;
    }
}

monthGrid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("month-cell") || e.target.classList.contains("disabled")) return;

    const m = parseInt(e.target.dataset.month);
    currentDate.setMonth(m);

    showMonth();
});



// ------------------- VISTA DE AÑOS -------------------
function showYears() {
    calendarDays.classList.add("hidden");
    monthGrid.classList.add("hidden");
    yearGrid.classList.remove("hidden");

    yearGrid.innerHTML = "";
    for (let y = currentYear; y <= maxYear; y++) {
        yearGrid.innerHTML += `<div class="year-cell" data-year="${y}">${y}</div>`;
    }
}

yearGrid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("year-cell")) return;
    const y = parseInt(e.target.dataset.year);
    currentDate.setFullYear(y);
    showMonths();
});



// ------------------- NAVEGACION MESES -------------------
prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    if (currentDate < today) currentDate = new Date(today);
    showMonth();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    if (currentDate.getFullYear() > maxYear) currentDate.setFullYear(maxYear);
    showMonth();
});

// Inicializar
showMonth();
updateButtonText();
