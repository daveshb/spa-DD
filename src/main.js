import { routes } from "./constants/routes";

import "./styles/home.css"
import "./styles/login.css"
import "./styles/about.css"
import "./styles/globals.css"
import "./styles/contact.csaas"

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const route = e.target.getAttribute("href");
    navigate(route);
  }
});

async function navigate(pathname) {
  const route = routes[pathname];

  const resp = await fetch(route);
  const html = await resp.text();

  document.querySelector("#app").innerHTML = html;
  return html;
}
