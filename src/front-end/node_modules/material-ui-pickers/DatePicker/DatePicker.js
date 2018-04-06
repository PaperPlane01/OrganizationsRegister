'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = undefined;

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

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _YearSelection = require('./YearSelection');

var _YearSelection2 = _interopRequireDefault(_YearSelection);

var _PickerToolbar = require('../_shared/PickerToolbar');

var _PickerToolbar2 = _interopRequireDefault(_PickerToolbar);

var _ToolbarButton = require('../_shared/ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = exports.DatePicker = function (_PureComponent) {
  (0, _inherits3.default)(DatePicker, _PureComponent);

  function DatePicker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DatePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      showYearSelection: _this.props.openToYearSelection
    }, _this.handleYearSelect = function (date) {
      _this.props.onChange(date, false);
      _this.openCalendar();
    }, _this.openYearSelection = function () {
      _this.setState({ showYearSelection: true });
    }, _this.openCalendar = function () {
      _this.setState({ showYearSelection: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          disablePast = _props.disablePast,
          disableFuture = _props.disableFuture,
          onChange = _props.onChange,
          animateYearScrolling = _props.animateYearScrolling,
          leftArrowIcon = _props.leftArrowIcon,
          rightArrowIcon = _props.rightArrowIcon,
          renderDay = _props.renderDay,
          utils = _props.utils,
          shouldDisableDate = _props.shouldDisableDate;
      var showYearSelection = this.state.showYearSelection;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          _PickerToolbar2.default,
          null,
          _react2.default.createElement(_ToolbarButton2.default, {
            variant: 'subheading',
            onClick: this.openYearSelection,
            selected: showYearSelection,
            label: utils.getYearText(this.date)
          }),
          _react2.default.createElement(_ToolbarButton2.default, {
            variant: 'display1',
            onClick: this.openCalendar,
            selected: !showYearSelection,
            label: utils.getDatePickerHeaderText(this.date)
          })
        ),
        this.props.children,
        showYearSelection ? _react2.default.createElement(_YearSelection2.default, {
          date: this.date,
          onChange: this.handleYearSelect,
          minDate: this.minDate,
          maxDate: this.maxDate,
          disablePast: disablePast,
          disableFuture: disableFuture,
          animateYearScrolling: animateYearScrolling,
          utils: utils
        }) : _react2.default.createElement(_Calendar2.default, {
          date: this.date,
          onChange: onChange,
          disablePast: disablePast,
          disableFuture: disableFuture,
          minDate: this.minDate,
          maxDate: this.maxDate,
          leftArrowIcon: leftArrowIcon,
          rightArrowIcon: rightArrowIcon,
          renderDay: renderDay,
          utils: utils,
          shouldDisableDate: shouldDisableDate
        })
      );
    }
  }, {
    key: 'date',
    get: function get() {
      return this.props.utils.startOfDay(this.props.date);
    }
  }, {
    key: 'minDate',
    get: function get() {
      return this.props.utils.date(this.props.minDate);
    }
  }, {
    key: 'maxDate',
    get: function get() {
      return this.props.utils.date(this.props.maxDate);
    }
  }]);
  return DatePicker;
}(_react.PureComponent);

DatePicker.propTypes = {
  date: _propTypes2.default.object.isRequired,
  minDate: _propTypes4.default.date,
  maxDate: _propTypes4.default.date,
  onChange: _propTypes2.default.func.isRequired,
  disablePast: _propTypes2.default.bool,
  disableFuture: _propTypes2.default.bool,
  animateYearScrolling: _propTypes2.default.bool,
  openToYearSelection: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  leftArrowIcon: _propTypes2.default.node,
  rightArrowIcon: _propTypes2.default.node,
  renderDay: _propTypes2.default.func,
  utils: _propTypes2.default.object.isRequired,
  shouldDisableDate: _propTypes2.default.func
};
DatePicker.defaultProps = {
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  disablePast: false,
  disableFuture: false,
  animateYearScrolling: undefined,
  openToYearSelection: false,
  children: null,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  renderDay: undefined,
  shouldDisableDate: undefined
};
exports.default = (0, _WithUtils2.default)()(DatePicker);