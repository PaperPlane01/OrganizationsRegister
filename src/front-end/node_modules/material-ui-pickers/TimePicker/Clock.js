'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clock = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _ClockPointer = require('./ClockPointer');

var _ClockPointer2 = _interopRequireDefault(_ClockPointer);

var _clockTypes = require('../constants/clock-types');

var clockType = _interopRequireWildcard(_clockTypes);

var _timeUtils = require('../_helpers/time-utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Clock = exports.Clock = function (_Component) {
  (0, _inherits3.default)(Clock, _Component);

  function Clock() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Clock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Clock.__proto__ || (0, _getPrototypeOf2.default)(Clock)).call.apply(_ref, [this].concat(args))), _this), _this.handleTouchMove = function (e) {
      _this.isMoving = true;
      _this.setTime(e);
    }, _this.handleMouseUp = function (e) {
      if (_this.isMoving) {
        _this.isMoving = false;
      }
      _this.setTime(e.nativeEvent, true);
    }, _this.handleTouchEnd = function (e) {
      if (_this.isMoving) {
        _this.setTime(e.nativeEvent, true);
        _this.isMoving = false;
      }
    }, _this.handleMove = function (e) {
      e.preventDefault();
      e.stopPropagation();
      // MouseEvent.which is deprecated, but MouseEvent.buttons is not supported in Safari
      var isButtonPressed = typeof e.buttons === 'undefined' ? e.nativeEvent.which === 1 : e.buttons === 1;

      if (isButtonPressed) {
        _this.setTime(e.nativeEvent, false);
      }
    }, _this.hasSelected = function () {
      var _this$props = _this.props,
          type = _this$props.type,
          value = _this$props.value;


      if (type === clockType.HOURS) {
        return true;
      }

      return value % 5 === 0;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Clock, [{
    key: 'setTime',
    value: function setTime(e) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var offsetX = e.offsetX,
          offsetY = e.offsetY;


      if (typeof offsetX === 'undefined') {
        var rect = e.target.getBoundingClientRect();

        offsetX = e.changedTouches[0].clientX - rect.left;
        offsetY = e.changedTouches[0].clientY - rect.top;
      }

      var value = this.props.type === clockType.MINUTES ? (0, _timeUtils.getMinutes)(offsetX, offsetY) : (0, _timeUtils.getHours)(offsetX, offsetY, this.props.ampm);

      this.props.onChange(value, isFinish);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          value = _props.value,
          children = _props.children,
          type = _props.type,
          ampm = _props.ampm;


      var max = type === clockType.HOURS ? 12 : 60;
      var isPointerInner = !ampm && type === clockType.HOURS && (value < 1 || value > 12);

      return _react2.default.createElement(
        'div',
        { className: classes.container },
        _react2.default.createElement(
          'div',
          {
            className: classes.clock
          },
          _react2.default.createElement('div', {
            role: 'menu',
            tabIndex: -1,
            className: classes.squareMask,
            onTouchMove: this.handleTouchMove,
            onTouchEnd: this.handleTouchEnd,
            onMouseUp: this.handleMouseUp,
            onMouseMove: this.handleMove
          }),
          _react2.default.createElement(_ClockPointer2.default, {
            max: max,
            value: value,
            isInner: isPointerInner,
            hasSelected: this.hasSelected()
          }),
          children
        )
      );
    }
  }]);
  return Clock;
}(_react.Component);

Clock.propTypes = {
  type: _propTypes2.default.oneOf((0, _keys2.default)(clockType).map(function (key) {
    return clockType[key];
  })).isRequired,
  classes: _propTypes2.default.object.isRequired,
  value: _propTypes2.default.number.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired,
  ampm: _propTypes2.default.bool
};
Clock.defaultProps = {
  ampm: false
};


var styles = function styles(theme) {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      margin: [[theme.spacing.unit * 4, 0, theme.spacing.unit]]
    },
    clock: {
      backgroundColor: 'rgba(0,0,0,.07)',
      borderRadius: '50%',
      height: 260,
      width: 260,
      position: 'relative',
      pointerEvents: 'none'
    },
    squareMask: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'auto',
      outline: 'none'
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersClock' })(Clock);