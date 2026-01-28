export const loginUser = async (email) => {
  try {
    const data = await fetch(`http://localhost:3000/usuarios?email=${email}`);
    const response = await data.json();
    return response[0] || null
  } catch (err) {
    console.log("Internal error", err);
  }
};
