'use strict';

var _chai = require('chai');

var _selectNaam = require('./selectNaam.js');

var _mannen = require('../../databank/voornamen/mannen');

var _mannen2 = _interopRequireDefault(_mannen);

var _vrouwen = require('../../databank/voornamen/vrouwen');

var _vrouwen2 = _interopRequireDefault(_vrouwen);

var _achternamen = require('../../databank/achternamen');

var _achternamen2 = _interopRequireDefault(_achternamen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('selectNaam()', function () {
  it('#can select voornaam (Male)', function () {
    var result = (0, _selectNaam.selectNaam)('Gerard', _mannen2.default);
    (0, _chai.expect)(result).to.equal('Gerardus');
  });

  it('#can select voornaam (Female)', function () {
    var result = (0, _selectNaam.selectNaam)('Liselotte', _vrouwen2.default);
    (0, _chai.expect)(result).to.equal('Neeltje');
  });

  it('#can select achternaam (1)', function () {
    var result = (0, _selectNaam.selectNaam)('de Vliet', _achternamen2.default);
    (0, _chai.expect)(result).to.equal('de Boij');
  });

  it('#can select achternaam (2)', function () {
    var result = (0, _selectNaam.selectNaam)('Kanter', _achternamen2.default);
    (0, _chai.expect)(result).to.equal('Sanders');
  });
});