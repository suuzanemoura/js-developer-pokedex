const pokemonList = document.getElementById("pokeList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal = document.querySelector(".modal");

const maxRecords = 151;
const limit = 36;
let offset = 0;

let pokeList = [];

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}" onclick="loadPokemonDetails('${
    pokemon.name
  }')">
            <span class="id">#${
              pokemon.id < 10
                ? "00" + pokemon.id
                : pokemon.id > 10 && pokemon.id < 100
                ? "0" + pokemon.id
                : pokemon.id
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

function convertPokemonToModal(pokemon) {
  modal.classList.add("active");
  modal.innerHTML = `
    <div class="modal-content ${pokemon.type}">
      <header class="header-modal">
        <nav class="nav-modal">
          <button type="button" onclick="closeModalButton()"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Voltar</button>
          <p class="id">#${
            pokemon.id < 10
              ? "00" + pokemon.id
              : pokemon.id > 10 && pokemon.id < 100
              ? "0" + pokemon.id
              : pokemon.id
          }</p>
        </nav>
            <h1 class="name">${pokemon.name}</h1>
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
      </header>
      <section class="pokemonDetails">
        <img src="${pokemon.photo}" alt="${pokemon.name}">

        <div class="menu-tab">
            <input type="radio" name="tabs" id="about" checked>
            <label for="about">About</label>

            <input type="radio" name="tabs" id="stats">
            <label for="stats">Base Stats</label>

            <input type="radio" name="tabs" id="moves">
            <label for="moves">Moves</label>

        <div class="content-tabs">
          <div class="pkmdetails">
          <p>${pokemon.about}</p>
          <table>
            <tr>
              <th>Species</th>
              <td>${pokemon.species}</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>${pokemon.height}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>${pokemon.weight}</td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>${pokemon.abilities.slice().join(", ")}</td>
            </tr>
          </table>
          <table>
            <caption>Breeding</caption>
            <tr>
              <th>Gender</th>
              <td>${pokemon.gender.male} ${pokemon.gender.female}</td>
            </tr>
            <tr>
              <th>Egg Groups</th>
              <td>${pokemon.eggGroups.slice().join(", ")}</td>
            </tr>
            <tr>
              <th>Egg Cycle</th>
              <td>${pokemon.eggCycle}</td>
            </tr>
          </table>
          </div>
          
          <div class="pkmdetails">
            <h2>SOBRE</h2>
          </div>
          
          <div class="pkmdetails">
            <h2>NOTÍCIAS</h2>
          
          </div>
        </div>
      </div>
        </section>
      </div>
  `;
}

function loadPokemonCards(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

    for (let pokemon of pokemons) {
      pokeList.push(pokemon);
    }
  });
}

loadPokemonCards(offset, limit);

const loadMorePokemons = (event) => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonCards(offset, newLimit);

    loadMoreButton.style.display = "none";
  } else {
    loadPokemonCards(offset, limit);
  }
};

const loadPokemonDetails = (pokemonName) => {
  pokeApi
    .getPokemonDetailsModal(pokemonName)
    .then((pokemon) => convertPokemonToModal(pokemon));
};
