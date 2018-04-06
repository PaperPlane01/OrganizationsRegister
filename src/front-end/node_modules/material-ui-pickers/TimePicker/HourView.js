'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HourView = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var HourView = exports.HourView = function (_PureComponent) {
  (0, _inherits3.default)(HourView, _PureComponent);

  function HourView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, HourView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HourView.__proto__ || (0, _getPrototypeOf2.default)(HourView)).call.apply(_ref, [this].concat(args))), _this), _this.getHourNumbers = function () {
      var _this$props = _this.props,
          ampm = _this$props.ampm,
          utils = _this$props.utils,
          date = _this$props.date;

      var currentHours = utils.getHours(date);

      var hourNumbers = [];
      var startHour = ampm ? 1 : 0;
      var endHour = ampm ? 12 : 23;

      var isSelected = function isSelected(hour) {
        if (ampm) {
          if (hour === 12) {
            return currentHours === 12 || currentHours === 0;
          }

          return currentHours === hour || currentHours - 12 === hour;
        }

        return currentHours === hour;
      };

      for (var hour = startHour; hour <= endHour; hour += 1) {
        var label = hour.toString();

        if (hour === 0) {
          label = '00';
        }

        var props = {
          index: hour,
          label: utils.formatNumber(label),
          selected: isSelected(hour),
          isInner: !ampm && (hour === 0 || hour > 12)
        };

        hourNumbers.push(_react2.default.createElement(_ClockNumber2.default, (0, _extends3.default)({ key: hour }, props)));
      }

      return hourNumbers;
    }, _this.handleChange = function (hours, isFinish) {
      var _this$props2 = _this.props,
          date = _this$props2.date,
          utils = _this$props2.utils;

      var updatedTime = utils.setHours(date, hours);

      _this.props.onChange(updatedTime, isFinish);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(HourView, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          date = _props.date,
          ampm = _props.ampm,
          utils = _props.utils;

      var value = utils.getHours(date);

      return _react2.default.createElement(
        _Clock2.default,
        {
          type: _clockTypes.HOURS,
          value: value,
          ampm: ampm,
          onChange: this.handleChange
        },
        this.getHourNumbers()
      );
    }
  }]);
  return HourView;
}(_react.PureComponent);

HourView.propTypes = {
  date: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  utils: _propTypes2.default.object.isRequired,
  ampm: _propTypes2.default.bool
};
HourView.defaultProps = {
  ampm: true
};
exports.default = (0, _WithUtils2.default)()(HourView);