'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlagItem = exports.FlagContainer = exports.glitch = undefined;

var _templateObject = _taggedTemplateLiteral(['\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: var(--glitch-width);\n\theight: var(--glitch-height);\n  overflow: hidden;\n  \n  .glitch__img {\n    position: absolute;\n    top: calc(-1 * var(--gap-vertical));\n    left: calc(-1 * var(--gap-horizontal));\n    width: calc(100% + var(--gap-horizontal) * 2);\n    height: calc(100% + var(--gap-vertical) * 2);\n    background: url(\'../OudHollandseNamen/img/1.jpg\') no-repeat 50% 0;\n    \n    background-color: var(--blend-color-1);\n    background-size: cover;\n    transform: translate3d(0,0,0);\n    background-blend-mode: var(--blend-mode-1);\n  }\n\n  .glitch__img:nth-child(n+2) {\n    opacity: 0;\n  }\n'], ['\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: var(--glitch-width);\n\theight: var(--glitch-height);\n  overflow: hidden;\n  \n  .glitch__img {\n    position: absolute;\n    top: calc(-1 * var(--gap-vertical));\n    left: calc(-1 * var(--gap-horizontal));\n    width: calc(100% + var(--gap-horizontal) * 2);\n    height: calc(100% + var(--gap-vertical) * 2);\n    background: url(\'../OudHollandseNamen/img/1.jpg\') no-repeat 50% 0;\n    \n    background-color: var(--blend-color-1);\n    background-size: cover;\n    transform: translate3d(0,0,0);\n    background-blend-mode: var(--blend-mode-1);\n  }\n\n  .glitch__img:nth-child(n+2) {\n    opacity: 0;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: flex;\n  justify-content: space-evenly;\n'], ['\n  display: flex;\n  justify-content: space-evenly;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  ', '\n  max-width: 60px;\n  max-height: 40px;\n  cursor: pointer;\n'], ['\n  ', '\n  max-width: 60px;\n  max-height: 40px;\n  cursor: pointer;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    border: 2px solid white;\n    border-radius: 2px;\n  '], ['\n    border: 2px solid white;\n    border-radius: 2px;\n  ']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var glitch = exports.glitch = _styledComponents2.default.div(_templateObject);

var FlagContainer = exports.FlagContainer = _styledComponents2.default.div(_templateObject2);

var FlagItem = exports.FlagItem = _styledComponents2.default.img(_templateObject3, function (props) {
  return props.isSelected && (0, _styledComponents.css)(_templateObject4);
});