'use strict';

var _chai = require('chai');

var _selectAchternaam = require('./selectAchternaam.js');

var _achternamen = require('../../databank/achternamen');

var _achternamen2 = _interopRequireDefault(_achternamen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('selectAchternaam()', function () {
  it('#can select achternaam (1)', function () {
    var result = (0, _selectAchternaam.selectAchternaam)('Smudde', _achternamen2.default);
    (0, _chai.expect)(result).to.equal('Amede');
  });

  it('#can select achternaam (2)', function () {
    var result = (0, _selectAchternaam.selectAchternaam)('den Hartog', _achternamen2.default);
    (0, _chai.expect)(result).to.equal('ter Maet');
  });
});