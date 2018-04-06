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

var _ModalDialog = require('../_shared/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _DateTextField = require('../_shared/DateTextField');

var _DateTextField2 = _interopRequireDefault(_DateTextField);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalWrapper = function (_PureComponent) {
  (0, _inherits3.default)(ModalWrapper, _PureComponent);

  function ModalWrapper() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalWrapper.__proto__ || (0, _getPrototypeOf2.default)(ModalWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.open = function () {
      _this.setState({ open: true });
      if (_this.props.onOpen) {
        _this.props.onOpen();
      }
    }, _this.close = function () {
      _this.setState({ open: false });
      if (_this.props.onClose) {
        _this.props.onClose();
      }
    }, _this.handleAccept = function () {
      _this.close();
      if (_this.props.onAccept) {
        _this.props.onAccept();
      }
    }, _this.handleDismiss = function () {
      _this.close();
      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }
    }, _this.handleClear = function () {
      _this.close();
      if (_this.props.onClear) {
        _this.props.onClear();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ModalWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          format = _props.format,
          children = _props.children,
          dialogContentClassName = _props.dialogContentClassName,
          onAccept = _props.onAccept,
          onDismiss = _props.onDismiss,
          invalidLabel = _props.invalidLabel,
          labelFunc = _props.labelFunc,
          okLabel = _props.okLabel,
          cancelLabel = _props.cancelLabel,
          clearLabel = _props.clearLabel,
          clearable = _props.clearable,
          onOpen = _props.onOpen,
          onClose = _props.onClose,
          other = (0, _objectWithoutProperties3.default)(_props, ['value', 'format', 'children', 'dialogContentClassName', 'onAccept', 'onDismiss', 'invalidLabel', 'labelFunc', 'okLabel', 'cancelLabel', 'clearLabel', 'clearable', 'onOpen', 'onClose']);


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_DateTextField2.default, (0, _extends3.default)({
          value: value,
          format: format,
          onClick: this.open
          // onFocus={this.togglePicker} <- Currently not properly works with .blur() on TextField
          , invalidLabel: invalidLabel,
          labelFunc: labelFunc,
          clearable: clearable
        }, other)),
        _react2.default.createElement(
          _ModalDialog2.default,
          {
            open: this.state.open,
            onClear: this.handleClear,
            onAccept: this.handleAccept,
            onDismiss: this.handleDismiss,
            dialogContentClassName: dialogContentClassName,
            clearLabel: clearLabel,
            okLabel: okLabel,
            cancelLabel: cancelLabel,
            clearable: clearable
          },
          children
        )
      );
    }
  }]);
  return ModalWrapper;
}(_react.PureComponent);

ModalWrapper.propTypes = {
  /* Picker value */
  value: _propTypes4.default.date,
  /* Format string */
  invalidLabel: _propTypes2.default.string,
  /* Function for dynamic rendering label (date, invalidLabel) => string */
  labelFunc: _propTypes2.default.func,
  /* "OK" label message */
  okLabel: _propTypes2.default.string,
  /* "Cancel" label message */
  cancelLabel: _propTypes2.default.string,
  /* "Clear" label message */
  clearLabel: _propTypes2.default.string,
  /* If true clear button will be displayed */
  clearable: _propTypes2.default.bool,
  /* On open callback */
  onOpen: _propTypes2.default.func,
  /* On close callback */
  onClose: _propTypes2.default.func,
  /* Format string */
  format: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  onAccept: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  onClear: _propTypes2.default.func,
  dialogContentClassName: _propTypes2.default.string
};
ModalWrapper.defaultProps = {
  dialogContentClassName: '',
  invalidLabel: undefined,
  value: new Date(),
  labelFunc: undefined,
  okLabel: undefined,
  cancelLabel: undefined,
  clearLabel: undefined,
  format: undefined,
  onAccept: undefined,
  onDismiss: undefined,
  onClear: undefined,
  clearable: false,
  onOpen: undefined,
  onClose: undefined
};
exports.default = ModalWrapper;