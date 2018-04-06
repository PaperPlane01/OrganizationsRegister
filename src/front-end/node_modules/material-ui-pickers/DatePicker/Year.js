'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Year = undefined;

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

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Year = exports.Year = function (_PureComponent) {
  (0, _inherits3.default)(Year, _PureComponent);

  function Year() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Year);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Year.__proto__ || (0, _getPrototypeOf2.default)(Year)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
      _this.props.onSelect(_this.props.value);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Year, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          classes = _props.classes,
          selected = _props.selected,
          disabled = _props.disabled,
          value = _props.value,
          children = _props.children,
          other = (0, _objectWithoutProperties3.default)(_props, ['classes', 'selected', 'disabled', 'value', 'children']);


      return _react2.default.createElement(
        _Typography2.default,
        (0, _extends3.default)({
          role: 'button',
          component: 'div',
          className: (0, _classnames3.default)(classes.root, (_classnames = {}, (0, _defineProperty3.default)(_classnames, classes.selected, selected), (0, _defineProperty3.default)(_classnames, classes.disabled, disabled), _classnames)),
          tabIndex: disabled ? -1 : 0,
          onClick: this.handleClick,
          onKeyPress: this.handleClick,
          color: selected ? 'primary' : 'default',
          variant: selected ? 'headline' : 'subheading'
        }, other),
        children
      );
    }
  }]);
  return Year;
}(_react.PureComponent);

Year.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.object.isRequired,
  disabled: _propTypes2.default.bool,
  onSelect: _propTypes2.default.func.isRequired,
  selected: _propTypes2.default.bool,
  value: _propTypes2.default.any.isRequired
};
Year.defaultProps = {
  selected: false,
  disabled: false
};


var styles = function styles(theme) {
  return {
    root: {
      height: theme.spacing.unit * 5,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: 'none',
      '&:focus': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    selected: {
      margin: '10px 0',
      fontWeight: theme.typography.fontWeightMedium
    },
    disabled: {
      pointerEvents: 'none',
      color: theme.palette.text.hint
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersYear' })(Year);