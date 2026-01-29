import { navigate } from "../main";

export function initHome() {
  let name = document.getElementById("name");
  let pass = document.getElementById("pass");
  let buttonLogout = document.getElementById("logout");

  let stringUser = localStorage.getItem("userData") || "";
  let objetUser = JSON.parse(stringUser);

  let passUser = sessionStorage.getItem("pass") || "";

  name.textContent = objetUser.userName;
  pass.textContent = passUser;

  buttonLogout.addEventListener("click", () => {
    localStorage.removeItem("userData");
    sessionStorage.removeItem("pass");

    // Redirigir a login después de logout
    navigate("/login");
  });
}