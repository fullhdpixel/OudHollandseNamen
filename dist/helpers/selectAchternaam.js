'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAchternaam = selectAchternaam;

var _similarity = require('./similarity');

function selectAchternaam(achternaam, collection) {
  // Calculate simularities between achternaam and collection
  var value = 0; // initial
  var highestIndex = 0; // index of highest value

  collection.forEach(function (name, index) {
    var test = (0, _similarity.similarity)(achternaam, name);
    if (test > value) {
      value = test;
      highestIndex = index;
    }
  });

  return collection[highestIndex];
}