import "./styles/globals.css";
import { routes } from "./constants/routes.js";
import { initLogin, initContact, initHome, initAbout, initTodoList } from "./scriptsViews"
import { isAuthenticated } from "./helpers/utils.js";

// Rutas públicas (sin login)
const publicRoutes = ["/login"];

// Función para proteger rutas
function checkRouteAccess(pathname) {
  const isLoggedIn = isAuthenticated();

  // Si intenta acceder a login y ya está logueado, redirige a home
  if (pathname === "/login" && isLoggedIn) {
    return "/home";
  }

  // Si intenta acceder a rutas protegidas sin loguear, redirige a login
  if (!publicRoutes.includes(pathname) && !isLoggedIn) {
    return "/login";
  }

  return pathname;
}

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const route = e.target.getAttribute("href");
    navigate(route);
  }
});

export async function navigate(pathname) {
  // Verificar acceso a la ruta
  const allowedRoute = checkRouteAccess(pathname);

  const routeEnd = routes[allowedRoute];
  const resp = await fetch(routeEnd);
  const html = await resp.text();
  document.getElementById("app").innerHTML = html;

  // Ejecutar lógica específica de cada vista
  const viewHandlers = {
    "/login": initLogin,
    "/home": initHome,
    "/about": initAbout,
    "/contact": initContact,
    "/todolist": initTodoList,
  };

  if (viewHandlers[allowedRoute]) {
    viewHandlers[allowedRoute]();
  }
}

// Inicializar la app al cargar
document.addEventListener("DOMContentLoaded", () => {
  const initialRoute = isAuthenticated() ? "/home" : "/login";
  navigate(initialRoute);
});
