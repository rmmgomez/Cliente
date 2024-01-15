// Web services http://arturober.com:5006/tareas
// GET all the todos and show them in the list
// When sending the form, generate a POST call and insert a new task
// OPTIONAL: Include a button to delete the task

fetch('http://arturober.com:5006/tareas')
.then(resp => resp.json())
.then(json => json.tareas.forEach(tarea => {
    addTarea(tarea);
}));

let ul = document.getElementById("todolist");

function addTarea(tarea) {
    let li = document.createElement("li");
    li.append(tarea.descripcion);

    let button = document.createElement("button");
    button.append("Delete");
    button.style.marginLeft = "10px";

    button.addEventListener("click", e => {
        fetch(`http://arturober.com:5006/tareas/${tarea.id}`, { method: "DELETE" })
        .then(resp => li.remove());
    });

    li.append(button);
    ul.append(li);
}

let form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    let tarea = {
        descripcion: form.desc.value
    };

    fetch('http://arturober.com:5006/tareas', {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(tarea)
    })
    .then(resp => resp.json())
    .then(json => addTarea(json.tarea));
});