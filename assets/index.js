const labor = document.getElementById("labores");
const ejecutadas = document.getElementById("ejecutadas");
const totalidad = document.getElementById("totalidad");
const insertar = document.getElementById("insertar");
const actividad = document.getElementById("actividad");
const adicion = [];

const actividadRender = () => {
  let contador = 0;
  let html = "";
  if (adicion.length > 0) {
    html = `<thead>
						<th>ID</th>
						<th>Tarea</th>
						<th></th>
						<th></th>
					</thead>
					<tbody>`;
    for (task of adicion) {
      if (task.state) {
        contador++;
        html += `<tr><td>${task.id}</td><td class="tachar">${task.description}</td><td><input type="checkbox" class="checkbox" onclick="cambioHecho(${task.id})" id="taskCheck" checked></td><td><img onclick="borrarActividad(${task.id})" src="./assets/img/equis.png" alt="Eliminar"></td></tr>`;
      } else {
        html += `<tr><td>${task.id}</td><td>${task.description}</td><td><input type="checkbox" class="checkbox" onclick="cambioHecho(${task.id})" id="taskCheck"></td><td><img onclick="borrarActividad(${task.id})" src="./assets/img/equis.png" alt="Eliminar"></td></tr>`;
      }
    }
    html += `</tbody>`;
  }
  labor.innerHTML = html;
  totalidad.innerHTML = adicion.length;
  ejecutadas.innerHTML = contador;
  actividad.focus();
};
const añadirActividad = (task) => {
  let idRand = Math.floor(Math.random() * 100);
  const ids = adicion.map((task) => task.id);
  while (ids.includes(idRand) === true) {
    idRand = Math.floor(Math.random() * 100);
  }
  adicion.push({ id: idRand, description: task, state: 0 });
};

const borrarActividad = (id) => {
  const indexTask = adicion.findIndex((searchIndex) => searchIndex.id === id);
  adicion.splice(indexTask, 1);
  actividadRender();
};

const cambioHecho = (id) => {
  const indexTask = adicion.findIndex((searchIndex) => searchIndex.id === id);
  if (adicion[indexTask].state === 0) {
    adicion.splice(indexTask, 1, {
      id: adicion[indexTask].id,
      description: adicion[indexTask].description,
      state: 1,
    });
  } else {
    adicion.splice(indexTask, 1, {
      id: adicion[indexTask].id,
      description: adicion[indexTask].description,
      state: 0,
    });
  }
  actividadRender();
};

insertar.addEventListener("click", () => {
  if (actividad.value) {
    añadirActividad(actividad.value);
    actividad.value = "";
    actividadRender();
  } else {
    alert("Debe ingresar una tarea");
    actividad.focus();
  }
});
