'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactGithubForkRibbon = require('react-github-fork-ribbon');

var _reactGithubForkRibbon2 = _interopRequireDefault(_reactGithubForkRibbon);

var _Index = require('./css/Index');

var Styled = _interopRequireWildcard(_Index);

var _selectNaam = require('./helpers/selectNaam');

var _mannen = require('../databank/voornamen/mannen');

var _mannen2 = _interopRequireDefault(_mannen);

var _vrouwen = require('../databank/voornamen/vrouwen');

var _vrouwen2 = _interopRequireDefault(_vrouwen);

var _achternamen = require('../databank/achternamen');

var _achternamen2 = _interopRequireDefault(_achternamen);

var _mannen3 = require('../databank/french_voornamen/mannen');

var _mannen4 = _interopRequireDefault(_mannen3);

var _vrouwen3 = require('../databank/french_voornamen/vrouwen');

var _vrouwen4 = _interopRequireDefault(_vrouwen3);

var _french_achternamen = require('../databank/french_achternamen');

var _french_achternamen2 = _interopRequireDefault(_french_achternamen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

    _this.fetchGender = function (e) {
      e.preventDefault();

      var voornaam = _this.state.voornaam;

      // determine gender based on voornaam

      voornaam = voornaam.trim();

      if (!navigator.onLine) return _this.setState({ hasError: true, errorReason: 'Je bent helaas niet online.' });

      fetch('https://api.genderize.io/?name=' + voornaam + '&country_id=NL').then(function (response) {
        if (!(response && response.status == 200)) return _this.setState({ hasError: true, errorReason: 'Tijdmachine is kapot.' });

        return response.json();
      }).then(function (_ref) {
        var error = _ref.error,
            gender = _ref.gender;

        if (error && error.message) return _this.setState({ hasError: true, errorReason: error.code + ' API error' + error.message });

        _this.createNaam(gender);
      });
    };

    _this.createNaam = function (gender) {
      var _this$state = _this.state,
          voornaam = _this$state.voornaam,
          achternaam = _this$state.achternaam,
          isFrench = _this$state.isFrench;


      voornaam = voornaam.trim();
      achternaam = achternaam.trim();

      var voornamen = gender === 'male' ? isFrench ? _mannen4.default : _mannen2.default : isFrench ? _vrouwen4.default : _vrouwen2.default;
      var firstname = (0, _selectNaam.selectNaam)(voornaam, voornamen);
      var lastname = (0, _selectNaam.selectNaam)(achternaam, isFrench ? _french_achternamen2.default : _achternamen2.default);
      var naam = firstname + ' ' + lastname;

      _this.setState({ naam: naam });
    };

    _this.capitalize = function (text) {
      return text.charAt(0).toUpperCase() + text.substr(1);
    };

    _this.onChange = function (_ref2) {
      var _ref2$target = _ref2.target,
          name = _ref2$target.name,
          value = _ref2$target.value;
      return _this.setState(_defineProperty({}, name, _this.capitalize(value)));
    };

    _this.retry = function () {
      return _this.setState({ naam: '', hasError: false, errorReason: '' });
    };

    _this.switchLanguage = function (countryString) {
      return _this.setState({ isFrench: countryString === 'french' });
    };

    _this.state = {
      voornaam: '', // input
      achternaam: '', // input
      naam: '', // result
      hasError: false, // if errorBox should be shown
      errorReason: '', // string with detailed error
      isFrench: true
    };
    return _this;
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          voornaam = _state.voornaam,
          achternaam = _state.achternaam,
          naam = _state.naam,
          hasError = _state.hasError,
          errorReason = _state.errorReason;


      var hasName = naam && naam.length > 1 || hasError ? true : false;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _reactGithubForkRibbon2.default,
          {
            href: 'https://github.com/fullhdpixel/OudHollandseNamen/',
            target: '_blank',
            position: 'right' },
          'View Source Code'
        ),
        _react2.default.createElement(
          'main',
          null,
          _react2.default.createElement(
            'div',
            { className: 'content' },
            _react2.default.createElement(
              Styled.glitch,
              null,
              _react2.default.createElement('div', { className: 'glitch__img' }),
              _react2.default.createElement('div', { className: 'glitch__img' }),
              _react2.default.createElement('div', { className: 'glitch__img' }),
              _react2.default.createElement('div', { className: 'glitch__img' }),
              _react2.default.createElement('div', { className: 'glitch__img' })
            ),
            hasError && _react2.default.createElement(
              'div',
              { className: 'content__text' },
              _react2.default.createElement(
                'div',
                { className: 'errorBox' },
                'Oeps, er ging iets verkeerd bij het starten van de tijdmachine. ',
                errorReason
              )
            ),
            _react2.default.createElement(
              'h2',
              { className: 'content__title' },
              naam
            ),
            hasName && _react2.default.createElement(
              'button',
              { onClick: function onClick() {
                  return _this2.retry();
                } },
              'Probeer Opnieuw'
            ),
            !hasName && _react2.default.createElement(
              'form',
              { onSubmit: this.fetchGender },
              _react2.default.createElement(
                'p',
                { className: 'content__text' },
                'Jouw naam in de tijd van Ren\xE9 Descartes.'
              ),
              _react2.default.createElement(
                Styled.FlagContainer,
                null,
                _react2.default.createElement(Styled.FlagItem, {
                  onClick: function onClick() {
                    return _this2.switchLanguage('dutch');
                  },
                  isSelected: !this.state.isFrench,
                  src: '../OudHollandseNamen/img/dutch_flag.svg',
                  alt: '' }),
                _react2.default.createElement(Styled.FlagItem, {
                  onClick: function onClick() {
                    return _this2.switchLanguage('french');
                  },
                  isSelected: this.state.isFrench,
                  src: '../OudHollandseNamen/img/french_flag.png',
                  alt: '' })
              ),
              _react2.default.createElement('input', {
                autoFocus: true,
                onChange: this.onChange,
                type: 'text',
                className: 'form-control',
                placeholder: 'Voornaam',
                name: 'voornaam',
                value: voornaam,
                required: true }),
              _react2.default.createElement('input', {
                onChange: this.onChange,
                type: 'text',
                className: 'form-control',
                placeholder: 'Achternaam',
                name: 'achternaam',
                value: achternaam,
                required: true }),
              _react2.default.createElement(
                'button',
                { type: 'submit' },
                'Start de tijdmachine'
              )
            )
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('root'));