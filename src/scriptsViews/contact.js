import { createUser } from "../services/user";

export function initContact() {
  const inputname = document.getElementById("inputName");
  const inputemail = document.getElementById("inputEmail");
  const inputage = document.getElementById("inputAge");
  const inputcity = document.getElementById("inputCity");
  const btnCreateUser = document.getElementById("btnCreateUser");

  let name;
  let email;
  let age;
  let city;

  inputname.addEventListener("input", (e) => {
    name = e.target.value;
  });
  inputemail.addEventListener("input", (e) => {
    email = e.target.value;
  });
  inputage.addEventListener("input", (e) => {
    age = e.target.value;
  });
  inputcity.addEventListener("input", (e) => {
    city = e.target.value;
  });

  btnCreateUser.addEventListener("click", async () => {
    const user = {
      name: name,
      email: email,
      age: age,
      city: city,
    };

    const response = await createUser(user);
    console.log(response);

    if (response) {
      console.log("Se aguardo el usuario");
    }

    // createUser(user).then((resp)=>{
    //   console.log(resp)
    //   if (resp){
    //    console.log( "Se aguardo el usuario")
    //   }
    // })
  });

  // Lógica específica para la vista contact
  console.log("Vista Contact cargada");
}