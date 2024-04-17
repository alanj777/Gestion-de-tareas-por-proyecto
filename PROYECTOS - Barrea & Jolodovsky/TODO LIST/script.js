let tareas = [];

function agregarTarea() {
  const entradaTarea = document.getElementById("entradaTarea");
  const textoTarea = entradaTarea.value.trim();
  if (textoTarea !== "") {
    const timestamp = new Date().getTime();
    const tarea = { texto: textoTarea, timestamp: timestamp, completada: false };
    tareas.push(tarea);
    mostrarTareas();
    entradaTarea.value = "";
  }
}

function mostrarTareas() {
  const listaTareas = document.getElementById("listaTareas");
  listaTareas.innerHTML = "";
  tareas.forEach(tarea => {
    const elementoTarea = document.createElement("li");
    const formatoHora = formatoFecha(tarea.timestamp);
    elementoTarea.innerText = `${tarea.texto} (${formatoHora})`;
    elementoTarea.addEventListener("click", () => alternarCompletada(tarea.timestamp));
    if (tarea.completada) {
      elementoTarea.classList.add("completada");
    }
    listaTareas.appendChild(elementoTarea);
  });
}

function alternarCompletada(timestamp) {
  const indiceTarea = tareas.findIndex(tarea => tarea.timestamp === timestamp);
  if (indiceTarea !== -1) {
    tareas[indiceTarea].completada = !tareas[indiceTarea].completada;
    mostrarTareas();
  }
}

function formatoFecha(timestamp) {
  const fecha = new Date(timestamp);
  return `${fecha.toLocaleTimeString()}`;
}

function encontrarTareaMasRapida() {
  const tareasCompletadas = tareas.filter(tarea => tarea.completada);
  if (tareasCompletadas.length === 0) {
    alert("No hay tareas completadas.");
    return;
  }
  const tareaMasRapida = tareasCompletadas.reduce((tareaAnterior, tareaActual) => {
    return tareaAnterior.timestamp < tareaActual.timestamp ? tareaAnterior : tareaActual;
  });
  alert(`La tarea completada más rápida es: ${tareaMasRapida.texto}`);
}

mostrarTareas();