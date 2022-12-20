const selects = document.getElementById("pokemon");
const btnfav = document.getElementById("btnfav");

async function clickSelccionar() {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const { results: pokenones } = await data.json();
  const option = document.getElementById("pokemon");
  console.log(pokenones);
  option.innerHTML = pokenones
    .map((pokemon) => {
      return `
    <option value=${pokemon.name}>${pokemon.name}</option>
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
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const result = await data.json();
  const img = result.sprites.other.dream_world.front_default;
  const card = document.getElementById("card");
  card.innerHTML = `
    <img
        width="300px"
        src=${img}
        alt="gato"
      />
    `;
}
cambiarImg("bulbasaur");

function ponerText(arg) {
  const parrafo = document.getElementById("titulo");
  parrafo.textContent = arg;
  // console.log(arg);
  btnfav.addEventListener("click", () => {
    console.log(parrafo.value);
    // return arg;
  });
}
