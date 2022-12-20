const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const nickname = document.getElementById("nickname");
//const password = document.getElementById("password");
const btnEditar = document.getElementById("editar");
const btnBorrar = document.getElementById("borrar");

async function cargarInfo() {
  const result = await fetch(
    "http://localhost:9000/api/users/63a0f37cc7656ca3e875ed56",
    {}
  );
  const data = await result.json();
  console.log(data);
  nombre.value = data.name;
  correo.value = data.email;
  nickname.value = data.nickname;
}
cargarInfo();

async function editarInfo() {
  if (btnEditar.textContent == "Editar") {
    btnEditar.textContent = "Guardar";
    nombre.disabled = false;
    nickname.disabled = false;
    correo.disabled = false;
    return;
  }
  let data = {
    name: nombre.value,
    email: correo.value,
    nickname: nickname.value,
  };
  const result = await fetch(
    "http://localhost:9000/api/users/63a0f564de0b8c7cd3f8be91",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const newData = await result.json();
  console.log(newData);
  nombre.disabled = true;
  nickname.disabled = true;
  correo.disabled = true;
  btnEditar.textContent = "Editar";
}
btnEditar.addEventListener("click", editarInfo);

async function borrarInfo() {
  let respuesta = confirm("Esta seguro de que desea borrar su usuario?");
  if (respuesta) {
    const result = await fetch(
      "http://localhost:9000/api/users/63a0f37cc7656ca3e875ed56",
      {
        method: "DELETE",
      }
    );
    const data = await result.json();
    console.log(data);
    window.location.href = "/";
  }
  return;
}
btnBorrar.addEventListener("click", borrarInfo);
