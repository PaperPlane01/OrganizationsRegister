'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DayWrapper = function (_PureComponent) {
  (0, _inherits3.default)(DayWrapper, _PureComponent);

  function DayWrapper() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DayWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DayWrapper.__proto__ || (0, _getPrototypeOf2.default)(DayWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      _this.props.onSelect(_this.props.value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DayWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          value = _props.value,
          dayInCurrentMonth = _props.dayInCurrentMonth,
          disabled = _props.disabled,
          onSelect = _props.onSelect,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'value', 'dayInCurrentMonth', 'disabled', 'onSelect']);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({
          onClick: dayInCurrentMonth && !disabled ? this.handleClick : undefined,
          onKeyPress: dayInCurrentMonth && !disabled ? this.handleClick : undefined,
          role: 'presentation'
        }, other),
        children
      );
    }
  }]);
  return DayWrapper;
}(_react.PureComponent);

DayWrapper.propTypes = {
  children: _propTypes2.default.node.isRequired,
  dayInCurrentMonth: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.any.isRequired
};
DayWrapper.defaultProps = {
  dayInCurrentMonth: true,
  disabled: false
};
exports.default = DayWrapper;