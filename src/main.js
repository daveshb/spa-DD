import "./style.css";


const routes = {
  "/home": "./views/home.html",
  "/login": "./views/login.html",
  "/about": "./views/about.html",
};

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
