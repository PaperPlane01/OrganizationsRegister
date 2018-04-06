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

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dialog = require('material-ui/Dialog/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('material-ui/Dialog/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _DialogContent = require('material-ui/Dialog/DialogContent');

var _DialogContent2 = _interopRequireDefault(_DialogContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dialogWidth = 310;
var styles = {
  dialogRoot: {
    minWidth: dialogWidth
  },
  dialog: {
    width: dialogWidth,

    '&:first-child': {
      padding: 0
    }
  },
  dialogActions: {
    // set justifyContent to default value to fix IE11 layout bug
    // see https://github.com/dmtrKovalenko/material-ui-pickers/pull/267
    justifyContent: 'flex-start'
  },
  dialogAction: {
    '&:first-child': {
      marginRight: 'auto'
    }
  }
};

var ModalDialog = function ModalDialog(_ref) {
  var children = _ref.children,
      classes = _ref.classes,
      onAccept = _ref.onAccept,
      onDismiss = _ref.onDismiss,
      onClear = _ref.onClear,
      okLabel = _ref.okLabel,
      cancelLabel = _ref.cancelLabel,
      clearLabel = _ref.clearLabel,
      dialogContentClassName = _ref.dialogContentClassName,
      clearable = _ref.clearable,
      other = (0, _objectWithoutProperties3.default)(_ref, ['children', 'classes', 'onAccept', 'onDismiss', 'onClear', 'okLabel', 'cancelLabel', 'clearLabel', 'dialogContentClassName', 'clearable']);
  return _react2.default.createElement(
    _Dialog2.default,
    (0, _extends3.default)({ onClose: onDismiss, classes: { paper: classes.dialogRoot } }, other),
    _react2.default.createElement(
      _DialogContent2.default,
      { className: (0, _classnames2.default)(classes.dialog, dialogContentClassName) },
      children
    ),
    _react2.default.createElement(
      _DialogActions2.default,
      {
        classes: {
          root: clearable && classes.dialogActions,
          action: clearable && classes.dialogAction
        }
      },
      clearable && _react2.default.createElement(
        _Button2.default,
        {
          color: 'primary',
          onClick: onClear,
          'aria-label': clearLabel
        },
        clearLabel
      ),
      _react2.default.createElement(
        _Button2.default,
        {
          color: 'primary',
          onClick: onDismiss,
          'aria-label': cancelLabel
        },
        cancelLabel
      ),
      _react2.default.createElement(
        _Button2.default,
        {
          color: 'primary',
          onClick: onAccept,
          'aria-label': okLabel
        },
        okLabel
      )
    )
  );
};

ModalDialog.propTypes = {
  children: _propTypes2.default.node.isRequired,
  onAccept: _propTypes2.default.func.isRequired,
  onDismiss: _propTypes2.default.func.isRequired,
  onClear: _propTypes2.default.func.isRequired,
  classes: _propTypes2.default.object.isRequired,
  dialogContentClassName: _propTypes2.default.string,
  okLabel: _propTypes2.default.string,
  cancelLabel: _propTypes2.default.string,
  clearLabel: _propTypes2.default.string,
  clearable: _propTypes2.default.bool.isRequired
};

ModalDialog.defaultProps = {
  dialogContentClassName: '',
  okLabel: 'OK',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersModal' })(ModalDialog);