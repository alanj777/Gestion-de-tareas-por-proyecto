let proyectos = [];
let tareaMasRapidaEncontrada = false;
let primeraTareaCompletada = null;

function agregarProyecto() {
  const projectName = document.getElementById('projectName').value.trim();
  const projectDescription = document.getElementById('projectDescription').value.trim();
  if (projectName !== '') {
    const proyecto = {
      id: proyectos.length + 1,
      nombre: projectName,
      descripcion: projectDescription,
      tareas: []
    };
    proyectos.push(proyecto);
    
 
    const selectProject = document.getElementById('selectProject');
    const filterProject = document.getElementById('filterProject'); 
    
    const option1 = document.createElement('option');
    option1.text = projectName;
    option1.value = proyecto.id;
    selectProject.add(option1);
    
    const option2 = document.createElement('option');
    option2.text = projectName;
    option2.value = proyecto.id;
    filterProject.add(option2); 
  }
}

function agregarTarea() {
  const todoInput = document.getElementById('todoInput').value.trim();
  const todoDescription = document.getElementById('todoDescription').value.trim(); 
  const dueDate = document.getElementById('dueDate').value;
  const projectId = document.getElementById('selectProject').value;
  const proyecto = proyectos.find(proj => proj.id === parseInt(projectId));
  
  if (todoInput !== '') {
    const tarea = {
      id: proyecto ? proyecto.tareas.length + 1 : -1, 
      descripcion: todoInput,
      detalle: todoDescription,
      estado: 'pendiente',
      fechaVencimiento: dueDate ? new Date(dueDate) : null
    };
    
    if (proyecto) {
      proyecto.tareas.push(tarea);
    } else {
      proyectos.push({
        id: -1,
        nombre: "Tareas Independientes",
        tareas: [tarea]
      });
    }
    
    mostrarTareas(); 
  }
}

function crearTareaIndependiente() {
  document.getElementById('selectProject').selectedIndex = 0;
  document.getElementById('projectName').value = '';
  document.getElementById('projectDescription').value = '';
  
  agregarTarea();
}


function mostrarTareas() {
    const projectId = document.getElementById('filterProject').value; 
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; 
    
    if (projectId === "todos") { 
      proyectos.forEach(proyecto => {
        proyecto.tareas.forEach(tarea => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<span>${proyecto.nombre} - ${tarea.descripcion} - ${tarea.detalle ? tarea.detalle : 'Sin descripción'} - Estado: ${tarea.estado} - Fecha de vencimiento: ${tarea.fechaVencimiento ? tarea.fechaVencimiento.toLocaleDateString() : 'Sin fecha'}</span>`;
          if (tarea.estado === 'pendiente') {
            listItem.addEventListener('click', () => marcarTareaComoCompletada(proyecto.id, tarea.id));
          } else {
            listItem.classList.add('completada');
          }
          todoList.appendChild(listItem);
        });
      });
    } else { 
      const proyecto = proyectos.find(proj => proj.id === parseInt(projectId));
      if (proyecto) {
        proyecto.tareas.forEach(tarea => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<span>${tarea.descripcion} - ${tarea.detalle ? tarea.detalle : 'Sin descripción'} - Estado: ${tarea.estado} - Fecha de vencimiento: ${tarea.fechaVencimiento ? tarea.fechaVencimiento.toLocaleDateString() : 'Sin fecha'}</span>`;
          if (tarea.estado === 'pendiente') {
            listItem.addEventListener('click', () => marcarTareaComoCompletada(projectId, tarea.id));
          } else {
            listItem.classList.add('completada');
          }
          todoList.appendChild(listItem);
        });
      }
    }
  }
  
 
  
  window.onload = function() {
    const selectProject = document.getElementById('selectProject');
    const filterProject = document.getElementById('filterProject'); 
    proyectos.forEach(proyecto => {
      const option1 = document.createElement('option');
      option1.text = proyecto.nombre;
      option1.value = proyecto.id;
      selectProject.add(option1);
      
      const option2 = document.createElement('option');
      option2.text = proyecto.nombre;
      option2.value = proyecto.id;
      filterProject.add(option2); 
    });
    
  
    document.getElementById('showTasksButton').addEventListener('click', mostrarTareas);
  };
  

function marcarTareaComoCompletada(projectId, taskId) {
  const proyecto = proyectos.find(proj => proj.id === parseInt(projectId));
  if (proyecto) {
    const tarea = proyecto.tareas.find(tarea => tarea.id === taskId);
    if (tarea) {
      tarea.estado = 'completada';
      if (!tareaMasRapidaEncontrada) {
        primeraTareaCompletada = tarea;
        tareaMasRapidaEncontrada = true;
      }
      mostrarTareas(); 
    }
  }
}

function mostrarTareaMasRapida() {
  if (primeraTareaCompletada) {
    alert(`La tarea que se completó más rápido fue: ${primeraTareaCompletada.descripcion}`);
  } else {
    alert('No hay tareas completadas aún.');
  }
}

function eliminarTodos() {
  proyectos.forEach(proyecto => proyecto.tareas = []); 
  tareaMasRapidaEncontrada = false;
  primeraTareaCompletada = null;
  mostrarTareas();
}


window.onload = function() {
  const selectProject = document.getElementById('selectProject');
  const filterProject = document.getElementById('filterProject'); 
  proyectos.forEach(proyecto => {
    const option1 = document.createElement('option');
    option1.text = proyecto.nombre;
    option1.value = proyecto.id;
    selectProject.add(option1);
    
    const option2 = document.createElement('option');
    option2.text = proyecto.nombre;
    option2.value = proyecto.id;
    filterProject.add(option2); 
  });
};

function buscarTareasPorFecha() {
  const dueDate = document.getElementById('dueDateSearch').value;
  const searchDate = dueDate ? new Date(dueDate) : null;

  const filteredTasks = [];
  proyectos.forEach(proyecto => {
    proyecto.tareas.forEach(tarea => {
      if (tarea.fechaVencimiento && tarea.fechaVencimiento.toDateString() === searchDate.toDateString()) {
        filteredTasks.push({
          proyecto: proyecto.nombre,
          descripcion: tarea.descripcion,
          detalle: tarea.detalle ? tarea.detalle : 'Sin descripción',
          estado: tarea.estado,
          fechaVencimiento: tarea.fechaVencimiento ? tarea.fechaVencimiento.toLocaleDateString() : 'Sin fecha'
        });
      }
    });
  });

  mostrarTareasFiltradas(filteredTasks);
}

function mostrarTareasFiltradas(filteredTasks) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  if (filteredTasks.length === 0) {
    todoList.innerHTML = '<li>No hay tareas para la fecha seleccionada.</li>';
    return;
  }

  filteredTasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${task.proyecto} - ${task.descripcion} - ${task.detalle} - Estado: ${task.estado} - Fecha de vencimiento: ${task.fechaVencimiento}</span>`;
    todoList.appendChild(listItem);
  });
}
