'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Day = function (_PureComponent) {
  (0, _inherits3.default)(Day, _PureComponent);

  function Day() {
    (0, _classCallCheck3.default)(this, Day);
    return (0, _possibleConstructorReturn3.default)(this, (Day.__proto__ || (0, _getPrototypeOf2.default)(Day)).apply(this, arguments));
  }

  (0, _createClass3.default)(Day, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          children = _props.children,
          classes = _props.classes,
          disabled = _props.disabled,
          hidden = _props.hidden,
          current = _props.current,
          selected = _props.selected,
          other = (0, _objectWithoutProperties3.default)(_props, ['children', 'classes', 'disabled', 'hidden', 'current', 'selected']);


      var className = (0, _classnames3.default)(classes.day, (_classnames = {}, (0, _defineProperty3.default)(_classnames, classes.hidden, hidden), (0, _defineProperty3.default)(_classnames, classes.current, current), (0, _defineProperty3.default)(_classnames, classes.selected, selected), (0, _defineProperty3.default)(_classnames, classes.disabled, disabled), _classnames));

      return _react2.default.createElement(
        _IconButton2.default,
        (0, _extends3.default)({
          className: className,
          tabIndex: hidden || disabled ? -1 : 0
        }, other),
        _react2.default.createElement(
          'span',
          null,
          ' ',
          children,
          ' '
        )
      );
    }
  }]);
  return Day;
}(_react.PureComponent);

Day.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.object.isRequired,
  current: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  hidden: _propTypes2.default.bool,
  selected: _propTypes2.default.bool
};
Day.defaultProps = {
  disabled: false,
  hidden: false,
  current: false,
  selected: false
};


var styles = function styles(theme) {
  return {
    day: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium
    },
    hidden: {
      opacity: 0,
      pointerEvents: 'none'
    },
    current: {
      color: theme.palette.primary.main,
      fontWeight: 600
    },
    selected: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersDay' })(Day);