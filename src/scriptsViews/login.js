import { navigate } from "../main";
import { loginUser } from '../services/login'

 export async function initLogin() {

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

  buttonInput.addEventListener("click", async () => {
    const userResp = await loginUser(user);


    if(!userResp){
      console.log("user not found")
      return
    }

    if (userResp.password == pass ) {
      console.log("incio sesion");

      const userObjet = {
        userName: user,
        userPass: pass,
        isActive: true,
        role: userResp.role,
      };

      localStorage.setItem("userData", JSON.stringify(userObjet));

      // Redirigir a home después de login
      navigate("/home");
    } else {
      console.log("no tiene acceso");
      alert("Usuario o contraseña incorrecta");
    }
  });
}