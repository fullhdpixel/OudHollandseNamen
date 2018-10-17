'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectVoornaam = selectVoornaam;

var _similarity = require('./similarity');

function selectVoornaam(voornaam, collection) {
  // Calculate simularities between voornaam and all in men/women
  var value = 0; // initial
  var highestIndex = 0; // index of highest value

  collection.forEach(function (name, index) {
    var test = (0, _similarity.similarity)(voornaam, name);
    if (test > value) {
      value = test;
      highestIndex = index;
    }
  });

  return collection[highestIndex];
}