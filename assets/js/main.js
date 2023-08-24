const pokemonList = document.getElementById("pokeList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 1008;
const limit = 60;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${
              pokemon.number < 10
                ? "00" + pokemon.number
                : pokemon.number > 10 && pokemon.number < 100
                ? "0" + pokemon.number
                : pokemon.number
            }</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map(
                        (type) =>
                          `<li class="type ${type}">${
                            type.charAt(0).toUpperCase() + type.slice(1)
                          }</li>`,
                      )
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
