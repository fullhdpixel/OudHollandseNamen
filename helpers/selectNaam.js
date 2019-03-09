'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectNaam = selectNaam;

var _similarity = require('./similarity');

function selectNaam(naam, collection) {
  // Calculate simularities between naam and all in men/women
  var value = 0; // initial
  var highestIndex = 0; // index of highest value

  collection.forEach(function (name, index) {
    var test = (0, _similarity.similarity)(naam, name);
    if (test > value) {
      value = test;
      highestIndex = index;
    }
  });

  return collection[highestIndex];
}