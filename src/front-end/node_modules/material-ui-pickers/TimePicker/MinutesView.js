'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinutesView = undefined;

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

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _clockTypes = require('../constants/clock-types');

var _ClockNumber = require('./ClockNumber');

var _ClockNumber2 = _interopRequireDefault(_ClockNumber);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MinutesView = exports.MinutesView = function (_Component) {
  (0, _inherits3.default)(MinutesView, _Component);

  function MinutesView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MinutesView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MinutesView.__proto__ || (0, _getPrototypeOf2.default)(MinutesView)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (minutes, isFinish) {
      var _this$props = _this.props,
          date = _this$props.date,
          utils = _this$props.utils;

      var updatedDate = utils.setMinutes(date, minutes);
      _this.props.onChange(updatedDate, isFinish);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MinutesView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          date = _props.date,
          utils = _props.utils;


      var f = utils.formatNumber;
      var value = utils.getMinutes(date);

      return _react2.default.createElement(
        _Clock2.default,
        {
          type: _clockTypes.MINUTES,
          onChange: this.handleChange,
          value: value
        },
        _react2.default.createElement(_ClockNumber2.default, { label: f('00'), selected: value === 0, index: 12 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('05'), selected: value === 5, index: 1 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('10'), selected: value === 10, index: 2 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('15'), selected: value === 15, index: 3 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('20'), selected: value === 20, index: 4 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('25'), selected: value === 25, index: 5 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('30'), selected: value === 30, index: 6 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('35'), selected: value === 35, index: 7 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('40'), selected: value === 40, index: 8 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('45'), selected: value === 45, index: 9 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('50'), selected: value === 50, index: 10 }),
        _react2.default.createElement(_ClockNumber2.default, { label: f('55'), selected: value === 55, index: 11 })
      );
    }
  }]);
  return MinutesView;
}(_react.Component);

MinutesView.propTypes = {
  date: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  utils: _propTypes2.default.object.isRequired
};
MinutesView.defaultProps = {};
exports.default = (0, _WithUtils2.default)()(MinutesView);