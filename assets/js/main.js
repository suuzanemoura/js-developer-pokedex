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
  }');">
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
  let total;

  for (let stat of pokemon.baseStats) {
    total += stat.value;
  }

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
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>
      </header>
      <section class="pokemonDetails">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
                <div class="menu-tab">
                    <header>
                      <nav>
                        <ul class="tabs">
                          <li class="tab-active" onclick="tabActive('#go-to-about')"><a href="#about" id="go-to-about">About</a></li>
                          <li onclick="tabActive('#go-to-stats')"><a href="#stats" id="go-to-stats">Base Stats</a></li>
                          <li onclick="tabActive('#go-to-moves')"><a href="#moves" id="go-to-moves">Moves</a></li>
                        </ul>
                      </nav>
                    </header>
                    
                    <section class="content-tabs">
                      <article id="about">
                      <p>${pokemon.about}</p>
                      <table cellspacing="0" cellpadding="0">
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
                          <td> ${pokemon.abilities
                            .map((ability) => `${ability.replace("-", " ")}`)
                            .join(", ")}</td>
                        </tr>
                      </table>
                      <table cellspacing="0" cellpadding="0">
                        <caption>Breeding</caption>
                        <tr>
                          <th>Gender</th>
                          <td>
                            ${
                              pokemon.gender.genderless == false
                                ? `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#00008b"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"/></svg> ${pokemon.gender.male}%
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill="#f74a8f"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z"/></svg> ${pokemon.gender.female}%`
                                : `Genderless`
                            }
                          </td>
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
                      </article>
                      <article id="stats">
                        <table cellspacing="0" cellpadding="0" class="stats">
                        ${pokemon.baseStats
                          .map((stat) => {
                            return `<tr>
                            <th class="stats-name">${stat.name}</th>
                            <td class="stats-value">${stat.value}</td>
                            <td>
                              <progress
                                max="155"
                                value="${stat.value}"
                                class="${
                                  stat.value >= 50
                                    ? "progress-more"
                                    : "progress-less"
                                }"
                              ></progress>
                            </td>
                          </tr>`;
                          })
                          .join("")}

                          <tr>
                            <th class="stats-name">Total</th>
                            <td class="stats-total">${pokemon.baseStats.reduce(
                              (acc, stat) => {
                                return (acc += stat.value);
                              },
                              0,
                            )}</td>
                          </tr>
                        
                      </table>
                      </article>
                      <article id="moves">
                      <ul>
                        ${pokemon.moves
                          .map(
                            (move) =>
                              `<li class="moves">${move.replace(
                                "-",
                                " ",
                              )}</li>`,
                          )
                          .join("")}
                       
                      </ul>
                      </article>
                    </section>
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
