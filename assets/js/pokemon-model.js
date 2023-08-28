class Pokemon {
  id;
  name;
  about;
  type;
  types = [];
  photo;
  species;
  height = 0;
  weight = 0;
  abilities = [];
  gender = {
    male: 0,
    female: 0,
    genderless: false,
  };
  eggGroups = [];
  eggCycle = 0;
  baseStats = [];
  moves = [];
}
