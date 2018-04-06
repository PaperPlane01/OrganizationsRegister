'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _Toolbar = require('material-ui/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerToolbar = function PickerToolbar(props) {
  var children = props.children,
      className = props.className,
      classes = props.classes,
      other = (0, _objectWithoutProperties3.default)(props, ['children', 'className', 'classes']);


  return _react2.default.createElement(
    _Toolbar2.default,
    (0, _extends3.default)({ className: (0, _classnames2.default)(classes.toolbar, className) }, other),
    children
  );
};

PickerToolbar.propTypes = {
  children: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired,
  className: _propTypes2.default.string,
  classes: _propTypes2.default.object.isRequired
};

PickerToolbar.defaultProps = {
  className: ''
};

var styles = function styles(theme) {
  return {
    toolbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 100,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background.default
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersToolbar' })(PickerToolbar);