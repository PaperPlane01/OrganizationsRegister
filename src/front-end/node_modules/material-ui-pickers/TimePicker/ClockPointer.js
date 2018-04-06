'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClockPointer = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClockPointer = exports.ClockPointer = function (_Component) {
  (0, _inherits3.default)(ClockPointer, _Component);

  function ClockPointer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ClockPointer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ClockPointer.__proto__ || (0, _getPrototypeOf2.default)(ClockPointer)).call.apply(_ref, [this].concat(args))), _this), _this.getAngleStyle = function () {
      var _this$props = _this.props,
          value = _this$props.value,
          isInner = _this$props.isInner,
          max = _this$props.max;


      var angle = 360 / max * value;

      return {
        height: isInner ? '26%' : '40%',
        transform: 'rotateZ(' + angle + 'deg)'
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ClockPointer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          hasSelected = _props.hasSelected;


      return _react2.default.createElement(
        'div',
        {
          className: classes.pointer,
          style: this.getAngleStyle()
        },
        _react2.default.createElement('div', { className: (0, _classnames3.default)(classes.thumb, (0, _defineProperty3.default)({}, classes.noPoint, hasSelected)) })
      );
    }
  }]);
  return ClockPointer;
}(_react.Component);

ClockPointer.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  value: _propTypes2.default.number.isRequired,
  hasSelected: _propTypes2.default.bool.isRequired,
  isInner: _propTypes2.default.bool.isRequired,
  max: _propTypes2.default.number.isRequired
};


var styles = function styles(theme) {
  return {
    pointer: {
      width: 2,
      backgroundColor: theme.palette.primary.main,
      position: 'absolute',
      left: 'calc(50% - 1px)',
      bottom: '50%',
      transformOrigin: 'center bottom 0px'
    },
    thumb: {
      width: 4,
      height: 4,
      backgroundColor: theme.palette.common.white,
      borderRadius: '100%',
      position: 'absolute',
      top: -21,
      left: -15,
      border: '14px solid ' + theme.palette.primary.main,
      boxSizing: 'content-box'
    },
    noPoint: {
      backgroundColor: theme.palette.primary.main
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersClockPointer' })(ClockPointer);