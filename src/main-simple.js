import {  getUserById, getUsers } from "./services/user.js";
import "./styles/globals.css";

export const routes = {
  "/home": "./views/home.html",
  "/login": "./views/login.html",
  "/about": "./views/about.html",
  "/contact": "./views/contact.html",
  "/todolist": "./views/todoList.html"
};

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const route = e.target.getAttribute("href");
    console.log(route)
    navigate(route);
  }
});

async function navigate(pathname) {
  // Verificar acceso a la ruta
  const routeEnd = routes[pathname];
  const resp = await fetch(routeEnd);
  const html = await resp.text();
  document.getElementById("app").innerHTML = html;

  // Ejecutar lógica específica de cada vista
  const viewHandlers = {
    "/login": initLogin,
    "/home": initHome,
    "/about": initAbout,
    "/contact": initContact,
    "/todolist": initTodoList
  };

  if (viewHandlers[pathname]) {
    viewHandlers[pathname]();
  }
}

// Inicializar la app al cargar
document.addEventListener("DOMContentLoaded", () => {
  const initialRoute = isAuthenticated() ? "/home" : "/login";
  navigate(initialRoute);
});



















async function initLogin() {
console.log("login");
}

function initHome() {
  console.log("home");
}

function initAbout() {
  console.log("about");
}

function initContact() {
  console.log("contact")
}



