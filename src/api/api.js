import axios from 'axios';
const fs = require('fs');


const URL_TO_GET_DATA = 'http://pokeapi.co/api/v2/pokemon/';


let count = 1;

const api = {
  getAllPokemons() {
    return this.getPokemonsFromPage(URL_TO_GET_DATA);
  },

  getPokemonsFromPage(url) {
    axios.get(url)
      .then((response) => {
        pokemons = pokemons.concat(response.data.results);
        console.log(pokemons);
        if (response.data.next) {
          this.getPokemonsFromPage(response.data.next);
        } else {
          fs.writeFile('message.txt', JSON.stringify(pokemons), (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
          });
        }
      })
      .catch((error) => { throw new Error(error); });
  },

  getPokemonsByOne() {
    console.log('start parsing');
    const getArray = [];

    const start = 721;
    const stop = 721;

    for (let i = start; i <= stop; i += 1) {
      const BASE_URL = `http://pokeapi.co/api/v2/pokemon/${i}/`;
      getArray.push(axios.get(BASE_URL).then(response => response.data));
    }

    axios.all(getArray).then((response) => {
      fs.writeFile(`pokemons${start}-${stop}.json`, JSON.stringify(response), (err) => {
        if (err) throw err;
          console.log('It\'s saved!');
      });
    });
  },
};

export default api;
