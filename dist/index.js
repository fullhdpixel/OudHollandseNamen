'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _toastr = require('toastr');

var _toastr2 = _interopRequireDefault(_toastr);

var _selectVoornaam = require('./helpers/selectVoornaam');

var _selectAchternaam = require('./helpers/selectAchternaam');

var _mannen = require('../databank/voornamen/mannen');

var _mannen2 = _interopRequireDefault(_mannen);

var _vrouwen = require('../databank/voornamen/vrouwen');

var _vrouwen2 = _interopRequireDefault(_vrouwen);

var _achternamen = require('../databank/achternamen');

var _achternamen2 = _interopRequireDefault(_achternamen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.selectAchternaam = function () {
      var countAchternamen = _achternamen2.default.length;
      var selectedValue = Math.floor(Math.random() * countAchternamen);

      return _achternamen2.default[selectedValue];
    };

    _this.createNaam = function (e) {
      e.preventDefault();

      var _this$state = _this.state,
          voornaam = _this$state.voornaam,
          achternaam = _this$state.achternaam,
          lastRequest = _this$state.lastRequest;


      if (lastRequest === voornaam + ' ' + achternaam) return _toastr2.default.error('Dit heb je al gedaan');

      // determine gender based on voornaam

      fetch('https://api.genderize.io/?name=' + voornaam + '&country_id=NL').then(function (response) {
        if (!(response && response.status == 200)) _toastr2.default.error('API Response was not correct!', 'Something went wrong');

        return response.json();
      }).then(function (_ref) {
        var error = _ref.error,
            gender = _ref.gender;

        if (error && error.message) return _toastr2.default.error(error.code + ' API error', error.message);

        var collection = gender === 'male' ? _mannen2.default : _vrouwen2.default;
        var firstname = (0, _selectVoornaam.selectVoornaam)(voornaam, collection);
        var lastname = (0, _selectAchternaam.selectAchternaam)(achternaam, _achternamen2.default);
        var naam = firstname + ' ' + lastname;

        _this.setState({ naam: naam, lastRequest: voornaam + ' ' + achternaam });
      });
    };

    _this.onChange = function (event) {
      var target = event.target;
      var name = target.name,
          value = target.value;


      _this.setState(_defineProperty({}, name, value));
    };

    _this.state = {
      voornaam: '', // input
      achternaam: '', // input
      naam: '', // result
      lastRequest: '' // avoids sending new requests
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          voornaam = _state.voornaam,
          achternaam = _state.achternaam,
          naam = _state.naam;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'form',
          { onSubmit: this.createNaam },
          'Voor jouw naam in en kijk wat je naam zou zijn in de tijd van Descartes.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', {
            autoFocus: true,
            onChange: this.onChange,
            type: 'text',
            placeholder: 'Voornaam',
            name: 'voornaam',
            value: voornaam,
            required: true }),
          _react2.default.createElement('input', {
            autoFocus: true,
            onChange: this.onChange,
            type: 'text',
            placeholder: 'Achternaam',
            name: 'achternaam',
            value: achternaam,
            required: true }),
          _react2.default.createElement(
            'button',
            { type: 'submit' },
            'Genereer je OudHollandSche naam'
          )
        ),
        naam
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('root'));