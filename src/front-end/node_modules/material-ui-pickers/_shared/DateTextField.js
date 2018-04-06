'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTextField = undefined;

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

var _Icon = require('material-ui/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _InputAdornment = require('material-ui/Input/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _MaskedInput = require('./MaskedInput');

var _MaskedInput2 = _interopRequireDefault(_MaskedInput);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp */
var DateTextField = exports.DateTextField = function (_PureComponent) {
  (0, _inherits3.default)(DateTextField, _PureComponent);

  function DateTextField() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DateTextField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateTextField.__proto__ || (0, _getPrototypeOf2.default)(DateTextField)).call.apply(_ref, [this].concat(args))), _this), _this.getDisplayDate = function (props) {
      var utils = props.utils,
          value = props.value,
          format = props.format,
          invalidLabel = props.invalidLabel,
          emptyLabel = props.emptyLabel,
          labelFunc = props.labelFunc;


      var isEmpty = value === null;
      var date = utils.date(value);

      if (labelFunc) {
        return labelFunc(isEmpty ? null : date, invalidLabel);
      }

      if (isEmpty) {
        return emptyLabel;
      }

      return utils.isValid(date) ? utils.format(date, format) : invalidLabel;
    }, _this.getError = function (value) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props;
      var utils = props.utils,
          maxDate = props.maxDate,
          minDate = props.minDate,
          disablePast = props.disablePast,
          disableFuture = props.disableFuture,
          maxDateMessage = props.maxDateMessage,
          minDateMessage = props.minDateMessage,
          invalidDateMessage = props.invalidDateMessage;


      if (!utils.isValid(value)) {
        // if null - do not show error
        if (utils.isNull(value)) {
          return '';
        }

        return invalidDateMessage;
      }

      if (maxDate && utils.isAfter(value, maxDate) || disableFuture && utils.isAfter(value, utils.endOfDay(utils.date()))) {
        return maxDateMessage;
      }

      if (minDate && utils.isBefore(value, minDate) || disablePast && utils.isBefore(value, utils.startOfDay(utils.date()))) {
        return minDateMessage;
      }

      return '';
    }, _this.updateState = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      return {
        value: props.value,
        displayValue: _this.getDisplayDate(props),
        error: _this.getError(props.utils.date(props.value), props)
      };
    }, _this.state = _this.updateState(), _this.handleBlur = function (e) {
      e.preventDefault();
      e.stopPropagation();
    }, _this.handleChange = function (e) {
      var _this$props = _this.props,
          clearable = _this$props.clearable,
          onClear = _this$props.onClear,
          utils = _this$props.utils,
          format = _this$props.format;


      if (clearable && e.target.value === '') {
        if (_this.props.value === null) {
          _this.setState(_this.updateState());
        } else if (onClear) {
          onClear();
        }

        return;
      }

      var oldValue = utils.date(_this.state.value);
      var newValue = utils.parse(e.target.value, format);

      var error = _this.getError(newValue);

      _this.setState({
        displayValue: e.target.value,
        value: error ? newValue : oldValue,
        error: error
      }, function () {
        if (!error && utils.format(newValue, 'LLLL') !== utils.format(oldValue, 'LLLL')) {
          _this.props.onChange(newValue);
        }
      });
    }, _this.handleFocus = function (e) {
      e.stopPropagation();
      e.preventDefault();
      var keyboard = _this.props.keyboard;


      if (keyboard) {
        return;
      }

      e.target.blur();
      _this.openPicker(e);
    }, _this.handleKeyPress = function (e) {
      if (e.key === 'Enter') {
        _this.openPicker(e);
      }
    }, _this.openPicker = function (e) {
      var _this$props2 = _this.props,
          disabled = _this$props2.disabled,
          onClick = _this$props2.onClick;


      if (!disabled) {
        onClick(e);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DateTextField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value || nextProps.format !== this.props.format || nextProps.maxDate !== this.props.maxDate || nextProps.minDate !== this.props.minDate || nextProps.emptyLabel !== this.props.emptyLabel || nextProps.utils !== this.props.utils) {
        this.setState(this.updateState(nextProps));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          utils = _props.utils,
          format = _props.format,
          classes = _props.classes,
          disabled = _props.disabled,
          onClick = _props.onClick,
          invalidLabel = _props.invalidLabel,
          invalidDateMessage = _props.invalidDateMessage,
          clearable = _props.clearable,
          onClear = _props.onClear,
          emptyLabel = _props.emptyLabel,
          labelFunc = _props.labelFunc,
          keyboard = _props.keyboard,
          value = _props.value,
          mask = _props.mask,
          InputProps = _props.InputProps,
          keyboardIcon = _props.keyboardIcon,
          maxDate = _props.maxDate,
          minDate = _props.minDate,
          disablePast = _props.disablePast,
          disableFuture = _props.disableFuture,
          maxDateMessage = _props.maxDateMessage,
          minDateMessage = _props.minDateMessage,
          TextFieldComponent = _props.TextFieldComponent,
          InputAdornmentProps = _props.InputAdornmentProps,
          adornmentPosition = _props.adornmentPosition,
          other = (0, _objectWithoutProperties3.default)(_props, ['utils', 'format', 'classes', 'disabled', 'onClick', 'invalidLabel', 'invalidDateMessage', 'clearable', 'onClear', 'emptyLabel', 'labelFunc', 'keyboard', 'value', 'mask', 'InputProps', 'keyboardIcon', 'maxDate', 'minDate', 'disablePast', 'disableFuture', 'maxDateMessage', 'minDateMessage', 'TextFieldComponent', 'InputAdornmentProps', 'adornmentPosition']);
      var _state = this.state,
          displayValue = _state.displayValue,
          error = _state.error;

      var localInputProps = {
        inputComponent: _MaskedInput2.default,
        inputProps: {
          mask: !keyboard ? null : mask,
          readOnly: !keyboard
        },
        className: classes.input
      };

      if (keyboard) {
        localInputProps[adornmentPosition + 'Adornment'] = _react2.default.createElement(
          _InputAdornment2.default,
          (0, _extends3.default)({ position: adornmentPosition }, InputAdornmentProps),
          _react2.default.createElement(
            _IconButton2.default,
            { onClick: this.openPicker },
            ' ',
            _react2.default.createElement(
              _Icon2.default,
              null,
              ' ',
              keyboardIcon,
              ' '
            ),
            ' '
          )
        );
      }

      return _react2.default.createElement(TextFieldComponent, (0, _extends3.default)({
        onClick: this.handleFocus,
        error: !!error,
        helperText: error,
        onKeyPress: this.handleKeyPress,
        onBlur: this.handleBlur,
        disabled: disabled,
        value: displayValue
      }, other, {
        onChange: this.handleChange,
        InputProps: (0, _extends3.default)({}, localInputProps, InputProps)
      }));
    }
  }]);
  return DateTextField;
}(_react.PureComponent);

DateTextField.propTypes = {
  classes: _propTypes2.default.shape({}).isRequired,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]),
  mask: _propTypes2.default.any,
  minDate: _propTypes4.default.date,
  minDateMessage: _propTypes2.default.string,
  maxDate: _propTypes4.default.date,
  maxDateMessage: _propTypes2.default.string,
  disablePast: _propTypes2.default.bool,
  disableFuture: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  format: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  onClear: _propTypes2.default.func,
  onClick: _propTypes2.default.func.isRequired,
  invalidLabel: _propTypes2.default.string,
  emptyLabel: _propTypes2.default.string,
  labelFunc: _propTypes2.default.func,
  keyboard: _propTypes2.default.bool,
  InputProps: _propTypes2.default.shape(),
  keyboardIcon: _propTypes2.default.node,
  invalidDateMessage: _propTypes2.default.string,
  clearable: _propTypes2.default.bool,
  TextFieldComponent: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  utils: _propTypes2.default.object.isRequired,
  InputAdornmentProps: _propTypes2.default.object,
  adornmentPosition: _propTypes2.default.oneOf(['start', 'end'])
};
DateTextField.defaultProps = {
  disabled: false,
  invalidLabel: 'Unknown',
  emptyLabel: '',
  value: new Date(),
  labelFunc: undefined,
  format: undefined,
  InputProps: undefined,
  keyboard: false,
  mask: undefined,
  keyboardIcon: 'event',
  invalidDateMessage: 'Invalid Date Format',
  clearable: false,
  onClear: undefined,
  disablePast: false,
  disableFuture: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  minDateMessage: 'Date should not be before minimal date',
  maxDateMessage: 'Date should not be after maximal date',
  TextFieldComponent: _TextField2.default,
  InputAdornmentProps: {},
  adornmentPosition: 'end'
};


var styles = {
  input: {
    alignItems: 'flex-end'
  }
};

exports.default = (0, _withStyles2.default)(styles)((0, _WithUtils2.default)()(DateTextField));