const API_URL = "http://localhost:3000/todos";

export const getTodos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const markTodoAsComplete = async (id, completed) => {
  try {
    const todo = await getTodoById(id);
    const updatedTodo = { ...todo, completado: completed };
    const response = await updateTodo(id, updatedTodo);
    return response;
  } catch (error) {
    console.error("Error marking todo as complete:", error);
    throw error;
  }
};
