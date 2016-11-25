'use strict';

var _api = require('./api/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var EXPRESS = require('express');
var CHALK = require('chalk');
var CORS = require('cors');
var _ = require('underscore');
var pokemonNames = require('../pokemon_names.json');
var pokemons = require('../pokemons1-811.json');

var SERVER = EXPRESS();
var PORT = process.env.PORT || 3000;

SERVER.use(CORS());

SERVER.get('/', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var pokemonsSortedByName = _.sortBy(pokemonNames.results, 'name');
  var names = _.pluck(pokemonsSortedByName, 'name').slice(offset, +offset + +limit);
  response.send(names);
});

SERVER.get('/micro', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var namesAndHeights = _.map(pokemons, function (pokemon) {
    return _.pick(pokemon, 'name', 'height');
  });
  var pokemonsSortedByHeight = namesAndHeights.sort(function (a, b) {
    if (a.height > b.height) return -1;
    if (a.height < b.height) return 1;
    if (a.height === b.height) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, +offset + +limit);
  var names = _.pluck(pokemonsSortedByHeight, 'name');
  response.send(names);
});

SERVER.get('/huge', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var namesAndHeights = _.map(pokemons, function (pokemon) {
    return _.pick(pokemon, 'name', 'height');
  });
  var pokemonsSortedByHeight = namesAndHeights.sort(function (a, b) {
    if (a.height > b.height) return 1;
    if (a.height < b.height) return -1;
    if (a.height === b.height) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, +offset + +limit);
  var names = _.pluck(pokemonsSortedByHeight, 'name');
  response.send(names);
});

SERVER.get('/light', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var namesAndWeights = _.map(pokemons, function (pokemon) {
    return _.pick(pokemon, 'name', 'weight');
  });
  var pokemonsSortedByWeight = namesAndWeights.sort(function (a, b) {
    if (a.weight > b.weight) return -1;
    if (a.weight < b.weight) return 1;
    if (a.weight === b.weight) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, +offset + +limit);
  var names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});

SERVER.get('/heavy', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var namesAndWeights = _.map(pokemons, function (pokemon) {
    return _.pick(pokemon, 'name', 'weight');
  });
  var pokemonsSortedByWeight = namesAndWeights.sort(function (a, b) {
    if (a.weight > b.weight) return 1;
    if (a.weight < b.weight) return -1;
    if (a.weight === b.weight) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, +offset + +limit);
  var names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});

SERVER.get('/angular', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var namesAndWeights = _.map(pokemons, function (pokemon) {
    return _.pick(pokemon, 'name', 'weight', 'height');
  });
  var pokemonsSortedByWeight = namesAndWeights.sort(function (a, b) {
    if (a.height / a.weight > b.height / b.weight) return 1;
    if (a.height / a.weight < b.height / b.weight) return -1;
    if (a.height / a.weight === b.height / b.weight) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, +offset + +limit);
  var names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});

SERVER.get('/fat', function (request, response) {
  var limit = request.query.limit || 20;
  var offset = request.query.offset || 0;

  var namesAndWeights = _.map(pokemons, function (pokemon) {
    return _.pick(pokemon, 'name', 'weight', 'height');
  });
  var pokemonsSortedByWeight = namesAndWeights.sort(function (a, b) {
    if (a.height / a.weight > b.height / b.weight) return -1;
    if (a.height / a.weight < b.height / b.weight) return 1;
    if (a.height / a.weight === b.height / b.weight) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
    }
  }).reverse().slice(offset, +offset + +limit);
  var names = _.pluck(pokemonsSortedByWeight, 'name');
  response.send(names);
});

SERVER.listen(PORT, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log(CHALK.cyan('Server is up on port: ' + PORT));
    // open("http://localhost:" + PORT);
  }
});