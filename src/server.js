import api from './api/api';
const fs = require('fs');

const EXPRESS = require('express');
const CHALK = require('chalk');
const CORS = require('cors');
const _ = require('underscore');
const pokemonNames = require('./base/pokemon_names.json');
const pokemons = require('./base/pokemons1-811.json');


const SERVER = EXPRESS();
const PORT = process.env.PORT || 3000;

SERVER.use(CORS());


SERVER.get('/', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const pokemonsSortedByName = _.sortBy(pokemonNames.results, 'name');
  const names = _.pluck(pokemonsSortedByName, 'name').slice(offset, (+offset + +limit));
  response.send(names);
});

SERVER.get('/micro', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const namesAndHeights = _.map(pokemons, pokemon => _.pick(pokemon, 'name', 'height'));
  const pokemonsSortedByHeight = namesAndHeights.sort((a, b) => {
    if (a.height > b.height) return -1;
    if (a.height < b.height) return 1;
    if (a.height === b.height) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, (+offset + +limit));
  const names = _.pluck(pokemonsSortedByHeight, 'name');
  response.send(names);
});

SERVER.get('/huge', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const namesAndHeights = _.map(pokemons, pokemon => _.pick(pokemon, 'name', 'height'));
  const pokemonsSortedByHeight = namesAndHeights.sort((a, b) => {
    if (a.height > b.height) return 1;
    if (a.height < b.height) return -1;
    if (a.height === b.height) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, (+offset + +limit));
  const names = _.pluck(pokemonsSortedByHeight, 'name');
  response.send(names);
});


SERVER.get('/light', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const namesAndWeights = _.map(pokemons, pokemon => _.pick(pokemon, 'name', 'weight'));
  const pokemonsSortedByWeight = namesAndWeights.sort((a, b) => {
    if (a.weight > b.weight) return -1;
    if (a.weight < b.weight) return 1;
    if (a.weight === b.weight) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, (+offset + +limit));
  const names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});

SERVER.get('/heavy', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const namesAndWeights = _.map(pokemons, pokemon => _.pick(pokemon, 'name', 'weight'));
  const pokemonsSortedByWeight = namesAndWeights.sort((a, b) => {
    if (a.weight > b.weight) return 1;
    if (a.weight < b.weight) return -1;
    if (a.weight === b.weight) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, (+offset + +limit));
  const names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});

SERVER.get('/angular', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const namesAndWeights = _.map(pokemons, pokemon => _.pick(pokemon, 'name', 'weight', 'height'));
  const pokemonsSortedByWeight = namesAndWeights.sort((a, b) => {
    if ((a.height / a.weight) > (b.height / b.weight)) return 1;
    if ((a.height / a.weight) < (b.height / b.weight)) return -1;
    if ((a.height / a.weight) === (b.height / b.weight)) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, (+offset + +limit));
  const names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});


SERVER.get('/fat', (request, response) => {
  const limit = request.query.limit || 20;
  const offset = request.query.offset || 0;

  const namesAndWeights = _.map(pokemons, pokemon => _.pick(pokemon, 'name', 'weight', 'height'));
  const pokemonsSortedByWeight = namesAndWeights.sort((a, b) => {
    if ((a.height / a.weight) > (b.height / b.weight)) return -1;
    if ((a.height / a.weight) < (b.height / b.weight)) return 1;
    if ((a.height / a.weight) === (b.height / b.weight)) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, (+offset + +limit));
  let names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});


SERVER.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(CHALK.cyan(`Server is up on port: ${PORT}`));
    // open("http://localhost:" + PORT);
  }
});
