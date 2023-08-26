const pokeApi = {};

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailsRequests) => Promise.all(detailsRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon);
};

pokeApi.getPokemonDetailsModal = (pokemonName) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon);
};

const convertPokeApiDetailsToPokemon = async (pokeDetails) => {
  const pokemon = new Pokemon();
  pokemon.id = pokeDetails.id;
  pokemon.name = pokeDetails.name;

  const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo =
    pokeDetails["sprites"]["other"]["official-artwork"]["front_default"];

  const height = pokeDetails.height / 10;
  pokemon.height =
    height >= 1 ? `${height.toFixed(2)}m` : `${height.toFixed(2)}cm`;
  pokemon.weight = `${pokeDetails.weight / 10}kg`;

  pokemon.abilities = pokeDetails.abilities.map(
    (abilitySlot) => abilitySlot.ability.name,
  );

  const moves = pokeDetails.moves.map((moveSlot) => moveSlot.move.name);
  pokemon.moves = moves;

  if (pokeDetails.stats) {
    let total = 0;
    pokeDetails.stats.map((statSlot) => {
      pokemon.baseStats[`${statSlot.stat.name}`] = statSlot.base_stat;
      total += statSlot.base_stat;
      pokemon.baseStats.total = total;
    });
  }

  try {
    const response = await fetch(pokeDetails.species.url);
    const speciesDetails = await response.json();

    if (speciesDetails.genera) {
      const [species] = speciesDetails.genera.filter(
        (generaSlot) => generaSlot.language.name === "en",
      );
      pokemon.species = species.genus;
    }

    if (speciesDetails.gender_rate) {
      const genderRate = speciesDetails.gender_rate;
      const female = (genderRate / 8) * 100;
      const male = 100 - female;

      genderRate !== -1
        ? ((pokemon.gender.female = female), (pokemon.gender.male = male))
        : (pokemon.gender.genderless = true);
    }

    if (speciesDetails.egg_groups) {
      pokemon.eggGroups = speciesDetails.egg_groups.map(
        (eggGroup) => eggGroup.name,
      );
    }

    if (speciesDetails.hatch_counter) {
      pokemon.eggCycle = 255 * (speciesDetails.hatch_counter + 1);
    }
  } catch (err) {
    console.error(err);
  }

  return pokemon;
};
