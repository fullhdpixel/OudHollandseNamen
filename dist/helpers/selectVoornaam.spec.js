'use strict';

var _chai = require('chai');

var _selectVoornaam = require('./selectVoornaam.js');

var _mannen = require('../../databank/voornamen/mannen');

var _mannen2 = _interopRequireDefault(_mannen);

var _vrouwen = require('../../databank/voornamen/vrouwen');

var _vrouwen2 = _interopRequireDefault(_vrouwen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('selectVoornaam()', function () {
  it('#can select voornaam (Male)', function () {
    var result = (0, _selectVoornaam.selectVoornaam)('Thijs', _mannen2.default);
    (0, _chai.expect)(result).to.equal('Matthijs');
  });

  it('#can select voornaam (Female)', function () {
    var result = (0, _selectVoornaam.selectVoornaam)('Liselotte', _vrouwen2.default);
    (0, _chai.expect)(result).to.equal('Neeltje');
  });
});