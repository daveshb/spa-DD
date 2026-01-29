// Función para verificar si está autenticado
export function isAuthenticated() {
  const userData = localStorage.getItem("userData");
  return userData && JSON.parse(userData).isActive;
}
