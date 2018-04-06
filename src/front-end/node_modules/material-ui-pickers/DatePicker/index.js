'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePickerWrapper = undefined;

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

var _ModalWrapper = require('../wrappers/ModalWrapper');

var _ModalWrapper2 = _interopRequireDefault(_ModalWrapper);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _PickerBase2 = require('../_shared/PickerBase');

var _PickerBase3 = _interopRequireDefault(_PickerBase2);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePickerWrapper = exports.DatePickerWrapper = function (_PickerBase) {
  (0, _inherits3.default)(DatePickerWrapper, _PickerBase);

  function DatePickerWrapper() {
    (0, _classCallCheck3.default)(this, DatePickerWrapper);
    return (0, _possibleConstructorReturn3.default)(this, (DatePickerWrapper.__proto__ || (0, _getPrototypeOf2.default)(DatePickerWrapper)).apply(this, arguments));
  }

  (0, _createClass3.default)(DatePickerWrapper, [{
    key: 'render',
    value: function render() {
      var date = this.state.date;
      var _props = this.props,
          value = _props.value,
          format = _props.format,
          autoOk = _props.autoOk,
          onChange = _props.onChange,
          animateYearScrolling = _props.animateYearScrolling,
          openToYearSelection = _props.openToYearSelection,
          invalidLabel = _props.invalidLabel,
          leftArrowIcon = _props.leftArrowIcon,
          rightArrowIcon = _props.rightArrowIcon,
          renderDay = _props.renderDay,
          labelFunc = _props.labelFunc,
          utils = _props.utils,
          shouldDisableDate = _props.shouldDisableDate,
          minDateMessage = _props.minDateMessage,
          maxDateMessage = _props.maxDateMessage,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          disablePast = _props.disablePast,
          disableFuture = _props.disableFuture,
          other = (0, _objectWithoutProperties3.default)(_props, ['value', 'format', 'autoOk', 'onChange', 'animateYearScrolling', 'openToYearSelection', 'invalidLabel', 'leftArrowIcon', 'rightArrowIcon', 'renderDay', 'labelFunc', 'utils', 'shouldDisableDate', 'minDateMessage', 'maxDateMessage', 'minDate', 'maxDate', 'disablePast', 'disableFuture']);


      return _react2.default.createElement(
        _ModalWrapper2.default,
        (0, _extends3.default)({
          ref: this.getRef,
          value: value,
          format: format,
          onClear: this.handleClear,
          onAccept: this.handleAccept,
          onChange: this.handleTextFieldChange,
          onDismiss: this.handleDismiss,
          invalidLabel: invalidLabel,
          labelFunc: labelFunc,
          minDate: minDate,
          maxDate: maxDate,
          disablePast: disablePast,
          disableFuture: disableFuture,
          minDateMessage: minDateMessage,
          maxDateMessage: maxDateMessage
        }, other),
        _react2.default.createElement(_DatePicker2.default, {
          date: date,
          onChange: this.handleChange,
          animateYearScrolling: animateYearScrolling,
          openToYearSelection: openToYearSelection,
          leftArrowIcon: leftArrowIcon,
          rightArrowIcon: rightArrowIcon,
          renderDay: renderDay,
          utils: utils,
          minDate: minDate,
          maxDate: maxDate,
          disablePast: disablePast,
          disableFuture: disableFuture,
          shouldDisableDate: shouldDisableDate
        })
      );
    }
  }]);
  return DatePickerWrapper;
}(_PickerBase3.default);

DatePickerWrapper.propTypes = {
  /* Datepicker value */
  value: _propTypes4.default.date,
  /* Min selectable date */
  minDate: _propTypes4.default.date,
  /* Max selectable date */
  maxDate: _propTypes4.default.date,
  /* Moment format string for input */
  format: _propTypes2.default.string,
  /* Callback firing when date accepted */
  onChange: _propTypes2.default.func.isRequired,
  /* Auto accept date on selection */
  autoOk: _propTypes2.default.bool,
  /* Disable past dates */
  disablePast: _propTypes2.default.bool,
  /* Disable future dates */
  disableFuture: _propTypes2.default.bool,
  /* To animate scrolling to current year (with scrollIntoView) */
  animateYearScrolling: _propTypes2.default.bool,
  /* Open datepicker from year selection */
  openToYearSelection: _propTypes2.default.bool,
  /* Displayed string if date can`t be parsed (or null) */
  invalidLabel: _propTypes2.default.string,
  /* Allow to specify dynamic label for text field labelFunc(date, invalidLabel) */
  labelFunc: _propTypes2.default.func,
  /* Left arrow icon */
  leftArrowIcon: _propTypes2.default.node,
  /* Right arrow icon */
  rightArrowIcon: _propTypes2.default.node,
  /* Custom renderer for day renderDay(date, selectedDate, dayInCurrentMonth) */
  renderDay: _propTypes2.default.func,
  /* Date displaying utils */
  utils: _propTypes2.default.object.isRequired,
  /* Disable specific date hook */
  shouldDisableDate: _propTypes2.default.func
};
DatePickerWrapper.defaultProps = {
  value: new Date(),
  format: 'MMMM Do',
  autoOk: false,
  minDate: undefined,
  maxDate: undefined,
  disablePast: undefined,
  disableFuture: undefined,
  animateYearScrolling: undefined,
  openToYearSelection: undefined,
  invalidLabel: undefined,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  renderDay: undefined,
  labelFunc: undefined,
  shouldDisableDate: undefined
};
exports.default = (0, _WithUtils2.default)()(DatePickerWrapper);