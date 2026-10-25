class Plan {
    constructor(id, nombre, precioBase, disponible) {
        this.id = id;
        this.nombre = nombre;
        this.precioBase = precioBase;
        this.disponible = disponible;
    }
}

let listaDePlanes = [
    new Plan(1, "básico", 1200, true),
    new Plan(2, "intermedio", 2400, true),
    new Plan(3, "premium", 4000, true)
];

const contenedorPlanes = document.getElementById("contenedor-planes");
const formPlan = document.getElementById("form-plan");
const inputNombre = document.getElementById("input-nombre");
const inputPrecio = document.getElementById("input-precio");
const inputBuscar = document.getElementById("input-buscar");
const feedback = document.getElementById("feedback");

function mostrarFeedback(mensaje, tipo) {
    feedback.textContent = mensaje;
    feedback.className = "feedback " + tipo;
    setTimeout(() => {
        feedback.className = "feedback hidden";
    }, 3000);
}

function renderizarPlanes(planesAgesionar) {
    contenedorPlanes.innerHTML = "";

    if (planesAgesionar.length === 0) {
        contenedorPlanes.innerHTML = "<p>No hay planes disponibles para mostrar.</p>";
        return;
    }

    planesAgesionar.forEach(plan => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "plan-card";

        tarjeta.innerHTML = `
            <div class="plan-info">
                <h3>${plan.nombre}</h3>
                <p>Precio base: $${plan.precioBase}</p>
            </div>
            <button class="btn-delete" data-id="${plan.id}">Eliminar</button>
        `;

        contenedorPlanes.appendChild(tarjeta);
    });

    const botonesEliminar = document.querySelectorAll(".btn-delete");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const idEliminar = parseInt(e.target.getAttribute("data-id"));
            eliminarPlan(idEliminar);
        });
    });
}

formPlan.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreVal = inputNombre.value.trim().toLowerCase();
    const precioVal = parseFloat(inputPrecio.value);

    if (nombreVal === "" || isNaN(precioVal) || precioVal <= 0) {
        mostrarFeedback("Por favor, ingresá datos válidos.", "error");
        return;
    }

    const nuevoId = listaDePlanes.length > 0 ? listaDePlanes[listaDePlanes.length - 1].id + 1 : 1;
    const nuevoPlan = new Plan(nuevoId, nombreVal, precioVal, true);

    listaDePlanes.push(nuevoPlan);
    renderizarPlanes(listaDePlanes);

    mostrarFeedback("¡Plan '" + nombreVal + "' agregado con éxito!", "success");
    formPlan.reset();
});

function eliminarPlan(id) {
    listaDePlanes = listaDePlanes.filter(p => p.id !== id);
    renderizarPlanes(listaDePlanes);
    mostrarFeedback("Plan eliminado correctamente.", "error");
}

inputBuscar.addEventListener("input", (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    const planesFiltrados = listaDePlanes.filter(plan => 
        plan.nombre.toLowerCase().includes(textoBusqueda)
    );
    renderizarPlanes(planesFiltrados);
});

renderizarPlanes(listaDePlanes);