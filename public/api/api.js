'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var URL_TO_GET_DATA = 'http://pokeapi.co/api/v2/pokemon/';

var count = 1;

var api = {
  getAllPokemons: function getAllPokemons() {
    return this.getPokemonsFromPage(URL_TO_GET_DATA);
  },
  getPokemonsFromPage: function getPokemonsFromPage(url) {
    var _this = this;

    _axios2.default.get(url).then(function (response) {
      pokemons = pokemons.concat(response.data.results);
      console.log(pokemons);
      if (response.data.next) {
        _this.getPokemonsFromPage(response.data.next);
      } else {
        fs.writeFile('message.txt', (0, _stringify2.default)(pokemons), function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });
      }
    }).catch(function (error) {
      throw new Error(error);
    });
  },
  getPokemonsByOne: function getPokemonsByOne() {
    console.log('start parsing');
    var getArray = [];

    var start = 721;
    var stop = 721;

    for (var i = start; i <= stop; i += 1) {
      var BASE_URL = 'http://pokeapi.co/api/v2/pokemon/' + i + '/';
      getArray.push(_axios2.default.get(BASE_URL).then(function (response) {
        return response.data;
      }));
    }

    _axios2.default.all(getArray).then(function (response) {
      fs.writeFile('pokemons' + start + '-' + stop + '.json', (0, _stringify2.default)(response), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });

    // const BASE_URL = `http://pokeapi.co/api/v2/pokemon/${start}/`;
    // console.log(BASE_URL);
    // axios.get(BASE_URL).then((response) => {
    //   const pokemon = response.data;
    //   console.log(pokemon.id);
    //   array[start - i] = pokemon;
    //   if (start === stop) {
    //     clearInterval(timer);
    //     fs.writeFile(`pokemons${i}-${stop}.json`, JSON.stringify(array), (err) => {
    //       if (err) throw err;
    //         console.log('It\'s saved!');
    //     });
    //   }
    //   c
    //   start += 1;
    // });
  }
};

exports.default = api;