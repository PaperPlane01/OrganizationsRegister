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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToolbarButton = function ToolbarButton(props) {
  var classes = props.classes,
      selected = props.selected,
      label = props.label,
      className = props.className,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'selected', 'label', 'className']);


  return _react2.default.createElement(
    _Typography2.default,
    (0, _extends3.default)({
      className: (0, _classnames3.default)(classes.toolbarBtn, className, (0, _defineProperty3.default)({}, classes.toolbarBtnSelected, selected))
    }, other),
    label
  );
};

ToolbarButton.propTypes = {
  selected: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.string.isRequired,
  classes: _propTypes2.default.object.isRequired,
  className: _propTypes2.default.string
};

ToolbarButton.defaultProps = {
  className: ''
};

var styles = function styles(theme) {
  return {
    toolbarBtn: {
      cursor: 'pointer',
      color: 'rgba(255, 255, 255, 0.54)'
    },
    toolbarBtnSelected: {
      color: theme.palette.common.white
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersToolbarButton' })(ToolbarButton);