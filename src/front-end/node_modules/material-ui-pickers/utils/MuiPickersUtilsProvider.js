'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MuiPickersUtilsProvider = function (_PureComponent) {
  (0, _inherits3.default)(MuiPickersUtilsProvider, _PureComponent);

  function MuiPickersUtilsProvider() {
    (0, _classCallCheck3.default)(this, MuiPickersUtilsProvider);
    return (0, _possibleConstructorReturn3.default)(this, (MuiPickersUtilsProvider.__proto__ || (0, _getPrototypeOf2.default)(MuiPickersUtilsProvider)).apply(this, arguments));
  }

  (0, _createClass3.default)(MuiPickersUtilsProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          Utils = _props.utils,
          locale = _props.locale,
          moment = _props.moment;

      return {
        muiPickersDateUtils: new Utils({ locale: locale, moment: moment })
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return MuiPickersUtilsProvider;
}(_react.PureComponent);

MuiPickersUtilsProvider.propTypes = {
  utils: _propTypes2.default.func.isRequired,
  locale: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  children: _propTypes2.default.element.isRequired,
  moment: _propTypes2.default.func
};
MuiPickersUtilsProvider.defaultProps = {
  locale: undefined,
  moment: undefined
};
MuiPickersUtilsProvider.childContextTypes = {
  muiPickersDateUtils: _propTypes2.default.object
};
exports.default = MuiPickersUtilsProvider;