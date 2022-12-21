const listfav = document.querySelector(".listfav");

async function cargarPokemones() {
  const result = await fetch("http://localhost:9000/pokemon/favoritos/listar");
  const pokFavs = await result.json();
  const html = pokFavs
    .map((p) => {
      return `
    <div class="item">
        <div class="img-cont">
            <img src=${p.url} alt="img" />
        </div>
        <div class="text-list">
            <button id=${p.name}>X</button>
            <h4>Name:</h4>
            <h3>${p.name}</h3>
        </div>
    </div>
    `;
    })
    .join("");
  listfav.innerHTML = html;
}
//pintar los pokemons al cargar el documentos
cargarPokemones();
//delegacion de eventos
document.addEventListener("click", async (e) => {
  if (e.target.matches("button")) {
    const respConfirm = confirm("Eliminar de favoritos?");
    if (respConfirm) {
      const result = await fetch(
        `http://localhost:9000/pokemon/favoritos/eliminar/${e.target.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await result.json();
      console.log(data);
      cargarPokemones();
    }
    return;
  }
});
