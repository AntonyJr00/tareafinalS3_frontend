const selects = document.getElementById("pokemon");
const btnfav = document.getElementById("btnfav");
const parrafo = document.getElementById("titulo");

async function clickSelccionar() {
  const data = await fetch(`http://localhost:9000/pokemon/listar`);
  const result = await data.json();
  const option = document.getElementById("pokemon");
  //console.log(result);
  option.innerHTML = result
    .map((pokemon) => {
      return `
    <option id=${pokemon._id} value=${pokemon.name}>${pokemon.name}</option>
    `;
    })
    .join("");
}
const options = document.getElementById("#pokemon option");

document.addEventListener("change", (e) => {
  if (e.target.matches("#pokemon")) {
    cambiarImg(e.target.value);
    ponerText(e.target.value);
    e.preventDefault();
    return;
  }
});

clickSelccionar();

async function cambiarImg(pokemon = "") {
  const data = await fetch(`http://localhost:9000/pokemon/listar/${pokemon}`);
  const result = await data.json();
  const img = result.url;
  const card = document.getElementById("card");
  card.innerHTML = `
  <div class=${result.favorite ? "favorito" : "no-favorito"}>
    <img
    width="300px"
    src=${img}
    alt="gato"
    />
  <div>
  `;
}
cambiarImg("bulbasaur");

function ponerText(arg) {
  parrafo.textContent = arg;
  // console.log(arg);
}
ponerText("Bulbasaur");
//hoy dia
btnfav.addEventListener("click", async () => {
  const respConfirm = confirm("Agregar a favoritos?");
  if (respConfirm) {
    const result = await fetch(
      `http://localhost:9000/pokemon/favoritos/agregar/${selects.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await result.json();
    console.log(data);
    clickSelccionar();
    cambiarImg("bulbasaur");
  }
  return;
});
