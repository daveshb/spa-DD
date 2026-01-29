import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markTodoAsComplete,
} from "../services/todos"


export async function initTodoList() {
  let todos = [];

  const todoInput = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");
  const emptyState = document.getElementById("emptyState");


  const userString = localStorage.getItem("userData");
  const userObject = JSON.parse(userString)
  const isAdmin = userObject.role === "admin" ? true : false

  // Cargar todos al iniciar
  async function cargarTodos() {
    try {
      todos = await getTodos();
      renderizarTodos();
    } catch (error) {
      console.error("Error cargando todos:", error);
    }
  }

  // Agregar nuevo todo
  addBtn.addEventListener("click", agregarTodo);

  async function agregarTodo() {
    const titulo = todoInput.value.trim();

    if (!titulo) {
      alert("Por favor ingresa una tarea");
      return;
    }

    const nuevoTodo = {
      titulo: titulo,
      descripcion: "",
      completado: false,
      fechaCreacion: new Date().toISOString().split("T")[0],
    };

    try {
      const todoCreado = await createTodo(nuevoTodo);
      todos.push(todoCreado);
      todoInput.value = "";
      renderizarTodos();
    } catch (error) {
      console.error("Error creando todo:", error);
      alert("Error al crear la tarea");
    }
  }

  // Renderizar todos
  function renderizarTodos() {
    todoList.innerHTML = "";

    // if (todos.length === 0) {
    //   emptyState.style.display = "block";
    //   return;
    // }

    emptyState.style.display = "none";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completado ? "completed" : ""}`;
      li.innerHTML = `
        <div class="todo-content">
          <input 
            type="checkbox" 
            class="todo-checkbox" 
            ${todo.completado ? "checked" : ""} 
            data-id="${todo.id}"
          >
          <span class="todo-title">${todo.titulo}</span>
        </div>
        <div class="todo-actions">
          <button class="btn btn-edit" data-id="${todo.id}">Editar</button>
          ${isAdmin ? '<button class="btn btn-delete" data-id="${todo.id}">Eliminar</button>' : "" }
        </div>
      `;

      // Event listeners para los botones
      const checkbox = li.querySelector(".todo-checkbox");
      checkbox.addEventListener("change", () => toggleCompletado(todo.id));

      const editBtn = li.querySelector(".btn-edit");
      editBtn.addEventListener("click", () => editarTodo(todo.id));

      if(isAdmin){
        const deleteBtn = li.querySelector(".btn-delete");
        deleteBtn.addEventListener("click", () => eliminarTodo(todo.id));
      }

      todoList.appendChild(li);
    });
  }

  // Alternar estado completado
  async function toggleCompletado(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      const nuevoEstado = !todo.completado;
      const todoActualizado = await markTodoAsComplete(id, nuevoEstado);
      Object.assign(todo, todoActualizado);
      renderizarTodos();
    } catch (error) {
      console.error("Error actualizando todo:", error);
      alert("Error al actualizar la tarea");
    }
  }

  // Editar todo
  async function editarTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const nuevoTitulo = prompt("Editar tarea:", todo.titulo);

    if (nuevoTitulo === null) return; // El usuario canceló

    if (!nuevoTitulo.trim()) {
      alert("El título no puede estar vacío");
      return;
    }

    try {
      const todoActualizado = await updateTodo(id, {
        ...todo,
        titulo: nuevoTitulo.trim(),
      });
      Object.assign(todo, todoActualizado);
      renderizarTodos();
    } catch (error) {
      console.error("Error editando todo:", error);
      alert("Error al editar la tarea");
    }
  }

  // Eliminar todo
  async function eliminarTodo(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      return;
    }

    try {
      await deleteTodo(id);
      todos = todos.filter((todo) => todo.id !== id);
      renderizarTodos();
    } catch (error) {
      console.error("Error eliminando todo:", error);
      alert("Error al eliminar la tarea");
    }
  }

  // Cargar todos al iniciar la página
  cargarTodos();
}