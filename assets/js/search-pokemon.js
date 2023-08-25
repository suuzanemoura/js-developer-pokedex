let pokemonFound = [];

const searchingPokemon = () => {
  let searching = search.value;
  for (let pokemon of pokeList) {
    if (pokemon.name.toLowerCase().includes(searching.toLowerCase())) {
      pokemonFound.push(pokemon);
    }

    if (pokemon.id === Number(searching)) {
      pokemonFound.push(pokemon);
    }

    if (pokemon.types[1]) {
      pokemon.types[0].toLowerCase().includes(searching.toLowerCase()) ||
      pokemon.types[1].toLowerCase().includes(searching.toLowerCase())
        ? pokemonFound.push(pokemon)
        : null;
    } else {
      pokemon.types[0].toLowerCase().includes(searching.toLowerCase())
        ? pokemonFound.push(pokemon)
        : null;
    }
  }
};

const isPokemonFound = () => {
  if (!pokemonFound.length) {
    alert("Nenhum pokemon encontrado, tente novamente.");

    const newHtml = pokeList.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = `<button id="loadMoreButton" type="button" onclick="loadMorePokemons(event)">Load More</button>`;

    search.value = "";
  } else {
    const newHtml = pokemonFound.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;

    const button = document.getElementById("loadMoreButton");
    button ? button.parentElement.removeChild(button) : null;

    pokemonFound = [];
  }
};

const searchPokemon = (event) => {
  event.preventDefault();

  if (search.value === "") {
    alert("Digite sua busca e tente novamente.");
  } else if (search.value === "" && event.key === "Enter") {
    alert("Digite sua busca e tente novamente.");
  } else {
    searchingPokemon();
    isPokemonFound();
  }
};

const empty = () => {
  if (search.value === "") {
    const newHtml = pokeList.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;

    const pagination = document.getElementById("pagination");
    pagination.innerHTML = `<button id="loadMoreButton" type="button" onclick="loadMorePokemons(event)">Load More</button>`;
  }
};

console.log(pokemonFound);
console.log(search);
