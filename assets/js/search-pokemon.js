let pokemonFound = [];
const amountPkmsFoundDiv = document.getElementById("amountPkmsFound");

const amountPkmsFoundElements = (qtdPokemonFound, amountPokeList) => {
  return `
    <button type="button" onclick="empty()"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>Voltar</button>
    <p>${
      qtdPokemonFound === 1
        ? "Foi encontrado <strong>" + qtdPokemonFound + " pokémon</strong>"
        : "Foram encontrados <strong>" + qtdPokemonFound + " pokémons</strong>"
    }  dos ${amountPokeList} primeiros carregados, com o termo <em>"${
    search.value
  }"</em>.</p>
  `;
};

const searchingPokemon = () => {
  let searchValue = search.value;
  for (let pokemon of pokeList) {
    if (pokemon.types[1]) {
      pokemon.types[0].toLowerCase().includes(searchValue.toLowerCase()) ||
      pokemon.types[1].toLowerCase().includes(searchValue.toLowerCase()) ||
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      [pokemon.id].includes(Number(searchValue))
        ? pokemonFound.push(pokemon)
        : null;
    } else {
      pokemon.types[0].toLowerCase().includes(searchValue.toLowerCase()) ||
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      [pokemon.id].includes(Number(searchValue))
        ? pokemonFound.push(pokemon)
        : null;
    }
  }
};

const isPokemonFound = () => {
  if (!pokemonFound.length) {
    Swal.fire({
      text: "Nenhum pokemon encontrado, tente novamente!",
      icon: "error",
      confirmButtonColor: "#00008b",
      confirmButtonText: "OK",
    });

    amountPkmsFoundDiv.style.display = "none";

    const newHtml = pokeList.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;

    loadMoreButton.style.display = "block";
    search.value = "";
  } else {
    const newHtml = pokemonFound.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;

    amountPkmsFoundDiv.style.display = "flex";
    amountPkmsFoundDiv.innerHTML = amountPkmsFoundElements(
      pokemonFound.length,
      pokeList.length,
    );

    loadMoreButton.style.display = "none";

    search.value = "";
    pokemonFound = [];
  }
};

const searchPokemon = (event) => {
  event.preventDefault();

  if (search.value === "") {
    Swal.fire({
      text: "Digite sua busca e tente novamente!",
      icon: "error",
      confirmButtonColor: "#00008b",
      confirmButtonText: "OK",
    });
  } else if (search.value === "" && event.key === "Enter") {
    Swal.fire({
      text: "Digite sua busca e tente novamente!",
      icon: "error",
      confirmButtonColor: "#00008b",
      confirmButtonText: "OK",
    });
  } else {
    searchingPokemon();
    isPokemonFound();
  }
};

const empty = () => {
  if (search.value === "") {
    const newHtml = pokeList.map(convertPokemonToLi).join("");
    pokemonList.innerHTML = newHtml;

    loadMoreButton.style.display = "block";
    amountPkmsFoundDiv.style.display = "none";
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const scrollTop = document.getElementById("scrollTop");

window.onscroll = function () {
  scrollFunction();
};

const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }
};
