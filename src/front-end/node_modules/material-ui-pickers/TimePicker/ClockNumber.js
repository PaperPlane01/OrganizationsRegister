'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClockNumber = undefined;

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var positions = {
  0: [0, 40],
  1: [55, 19.6],
  2: [94.4, 59.5],
  3: [109, 114],
  4: [94.4, 168.5],
  5: [54.5, 208.4],
  6: [0, 223],
  7: [-54.5, 208.4],
  8: [-94.4, 168.5],
  9: [-109, 114],
  10: [-94.4, 59.5],
  11: [-54.5, 19.6],
  12: [0, 5],
  13: [36.9, 49.9],
  14: [64, 77],
  15: [74, 114],
  16: [64, 151],
  17: [37, 178],
  18: [0, 188],
  19: [-37, 178],
  20: [-64, 151],
  21: [-74, 114],
  22: [-64, 77],
  23: [-37, 50]
};

var ClockNumber = exports.ClockNumber = function (_Component) {
  (0, _inherits3.default)(ClockNumber, _Component);

  function ClockNumber() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ClockNumber);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ClockNumber.__proto__ || (0, _getPrototypeOf2.default)(ClockNumber)).call.apply(_ref, [this].concat(args))), _this), _this.getTransformStyle = function (index) {
      var position = positions[index];

      return {
        transform: 'translate(' + position[0] + 'px, ' + position[1] + 'px'
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ClockNumber, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          selected = _props.selected,
          label = _props.label,
          index = _props.index,
          classes = _props.classes,
          isInner = _props.isInner;


      var className = (0, _classnames3.default)(classes.clockNumber, (0, _defineProperty3.default)({}, classes.selected, selected));

      return _react2.default.createElement(
        _Typography2.default,
        {
          variant: isInner ? 'body1' : 'subheading',
          component: 'span',
          className: className,
          style: this.getTransformStyle(index, isInner)
        },
        label
      );
    }
  }]);
  return ClockNumber;
}(_react.Component);

ClockNumber.propTypes = {
  index: _propTypes2.default.number.isRequired,
  label: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.bool.isRequired,
  classes: _propTypes2.default.object.isRequired,
  isInner: _propTypes2.default.bool
};
ClockNumber.defaultProps = {
  isInner: false
};


var styles = function styles(theme) {
  var size = theme.spacing.unit * 4;
  return {
    clockNumber: {
      width: size,
      height: size,
      position: 'absolute',
      left: 'calc(50% - ' + size / 2 + 'px)',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      color: theme.palette.type === 'light' ? theme.palette.text.primary : theme.palette.text.hint
    },
    selected: {
      color: theme.palette.common.white
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersClockNumber' })(ClockNumber);