import "./styles/home.css";
import "./styles/login.css";
import "./styles/about.css";
import "./styles/globals.css";
import "./styles/contact.css";

export const routes = {
  "/home": "./views/home.html",
  "/login": "./views/login.html",
  "/about": "./views/about.html",
  "/contact": "./views/contact.html",
};

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const route = e.target.getAttribute("href");
    navigate(route);
  }
});

async function navigate(pathname) {
  const routeEnd = routes[pathname];
  const resp = await fetch(routeEnd);
  const html = await resp.text();
  document.getElementById("app").innerHTML = html;

  if (pathname == "/login") {
    let userInput = document.getElementById("userInput");
    let passInput = document.getElementById("passInput");
    let buttonInput = document.getElementById("buttonLogin");

    let user;
    let pass;

    userInput.addEventListener("input", (e) => {
      user = e.target.value;
    });

    passInput.addEventListener("input", (e) => {
      pass = e.target.value;
    });

    buttonInput.addEventListener("click", () => {
      if (user === "david" && pass === "123456") {
        console.log("incio sesion");

        const userObjet = {
          userName: user,
          userPass: pass,
          isActive: true,
          role: "admin"
        };

        console.log(userObjet)
        console.log(JSON.stringify(userObjet))
        console.log(typeof JSON.stringify(userObjet))

        localStorage.setItem("userData", JSON.stringify(userObjet));
        sessionStorage.setItem("pass", pass);
      } else {
        console.log("no tiene acceso");
      }
    });
  }

  if (pathname == "/home") {
    let name = document.getElementById("name");
    let pass = document.getElementById("pass");

    let buttonLogout = document.getElementById("logout");

    let stringUser = localStorage.getItem("userData") || "";
    let objetUser = JSON.parse(stringUser)
    console.log(objetUser)


    console.log(objetUser)
    console.log(typeof objetUser)

    let passUser = sessionStorage.getItem("pass") || "";

    name.textContent = objetUser.userName
    pass.textContent = passUser;

    buttonLogout.addEventListener("click", () => {
      localStorage.removeItem("user");
    });
  }
}
