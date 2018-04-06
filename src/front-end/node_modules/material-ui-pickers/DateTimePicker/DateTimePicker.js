'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePicker = undefined;

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

var _DateTimePickerView = require('./DateTimePickerView');

var _DateTimePickerView2 = _interopRequireDefault(_DateTimePickerView);

var _YearSelection = require('../DatePicker/YearSelection');

var _YearSelection2 = _interopRequireDefault(_YearSelection);

var _Calendar = require('../DatePicker/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _HourView = require('../TimePicker/HourView');

var _HourView2 = _interopRequireDefault(_HourView);

var _MinutesView = require('../TimePicker/MinutesView');

var _MinutesView2 = _interopRequireDefault(_MinutesView);

var _DateTimePickerTabs = require('./DateTimePickerTabs');

var _DateTimePickerTabs2 = _interopRequireDefault(_DateTimePickerTabs);

var _DateTimePickerHeader = require('./DateTimePickerHeader');

var _DateTimePickerHeader2 = _interopRequireDefault(_DateTimePickerHeader);

var _timeUtils = require('../_helpers/time-utils');

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _datePickerView = require('../constants/date-picker-view');

var viewType = _interopRequireWildcard(_datePickerView);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimePicker = exports.DateTimePicker = function (_Component) {
  (0, _inherits3.default)(DateTimePicker, _Component);

  function DateTimePicker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DateTimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DateTimePicker.__proto__ || (0, _getPrototypeOf2.default)(DateTimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      openView: _this.props.openTo,
      meridiemMode: _this.props.utils.getHours(_this.props.date) >= 12 ? 'pm' : 'am'
    }, _this.onChange = function (time) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var nextView = arguments[2];

      _this.handleChange(time);

      if (isFinish && _this.props.autoSubmit) {
        _this.handleViewChange(nextView);
      }
    }, _this.setMeridiemMode = function (mode) {
      return function () {
        _this.setState({ meridiemMode: mode }, function () {
          return _this.handleChange(_this.props.date, false);
        });
      };
    }, _this.handleViewChange = function (view) {
      _this.setState({ openView: view });
    }, _this.handleChange = function (time) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var withMeridiem = (0, _timeUtils.convertToMeridiem)(time, _this.state.meridiemMode, _this.props.ampm, _this.props.utils);
      _this.props.onChange(withMeridiem, isFinish);
    }, _this.handleYearChange = function (date, isFinish) {
      _this.onChange(date, isFinish, viewType.DATE);
    }, _this.handleDayChange = function (date, isFinish) {
      _this.onChange(date, isFinish, viewType.HOUR);
    }, _this.handleHourChange = function (time, isFinish) {
      _this.onChange(time, isFinish, viewType.MINUTES);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DateTimePicker, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          openView = _state.openView,
          meridiemMode = _state.meridiemMode;
      var _props = this.props,
          date = _props.date,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          showTabs = _props.showTabs,
          disablePast = _props.disablePast,
          disableFuture = _props.disableFuture,
          leftArrowIcon = _props.leftArrowIcon,
          rightArrowIcon = _props.rightArrowIcon,
          dateRangeIcon = _props.dateRangeIcon,
          timeIcon = _props.timeIcon,
          renderDay = _props.renderDay,
          utils = _props.utils,
          ampm = _props.ampm,
          shouldDisableDate = _props.shouldDisableDate,
          animateYearScrolling = _props.animateYearScrolling;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_DateTimePickerHeader2.default, {
          date: date,
          openView: openView,
          meridiemMode: meridiemMode,
          setMeridiemMode: this.setMeridiemMode,
          onOpenViewChange: this.handleViewChange,
          utils: utils,
          ampm: ampm
        }),
        showTabs && _react2.default.createElement(_DateTimePickerTabs2.default, {
          view: openView,
          onChange: this.handleViewChange,
          dateRangeIcon: dateRangeIcon,
          timeIcon: timeIcon
        }),
        _react2.default.createElement(
          _DateTimePickerView2.default,
          { view: viewType.YEAR, selected: openView },
          _react2.default.createElement(_YearSelection2.default, {
            date: date,
            minDate: minDate,
            maxDate: maxDate,
            onChange: this.handleYearChange,
            disablePast: disablePast,
            disableFuture: disableFuture,
            utils: utils,
            animateYearScrolling: animateYearScrolling
          })
        ),
        _react2.default.createElement(
          _DateTimePickerView2.default,
          { view: viewType.DATE, selected: openView },
          _react2.default.createElement(_Calendar2.default, {
            date: date,
            minDate: minDate,
            maxDate: maxDate,
            onChange: this.handleDayChange,
            disablePast: disablePast,
            disableFuture: disableFuture,
            leftArrowIcon: leftArrowIcon,
            rightArrowIcon: rightArrowIcon,
            renderDay: renderDay,
            utils: utils,
            shouldDisableDate: shouldDisableDate
          })
        ),
        _react2.default.createElement(
          _DateTimePickerView2.default,
          { view: viewType.HOUR, selected: openView },
          _react2.default.createElement(_HourView2.default, {
            date: date,
            meridiemMode: meridiemMode,
            onChange: this.handleHourChange,
            utils: utils,
            ampm: ampm
          })
        ),
        _react2.default.createElement(
          _DateTimePickerView2.default,
          { view: viewType.MINUTES, selected: openView },
          _react2.default.createElement(_MinutesView2.default, {
            date: date,
            onChange: this.handleChange,
            utils: utils
          })
        )
      );
    }
  }]);
  return DateTimePicker;
}(_react.Component);

DateTimePicker.propTypes = {
  date: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  autoSubmit: _propTypes2.default.bool,
  openTo: _propTypes2.default.oneOf((0, _keys2.default)(viewType).map(function (key) {
    return viewType[key];
  })),
  disablePast: _propTypes2.default.bool,
  disableFuture: _propTypes2.default.bool,
  minDate: _propTypes4.default.date,
  maxDate: _propTypes4.default.date,
  showTabs: _propTypes2.default.bool,
  leftArrowIcon: _propTypes2.default.node,
  rightArrowIcon: _propTypes2.default.node,
  dateRangeIcon: _propTypes2.default.node,
  timeIcon: _propTypes2.default.node,
  renderDay: _propTypes2.default.func,
  utils: _propTypes2.default.object.isRequired,
  ampm: _propTypes2.default.bool,
  shouldDisableDate: _propTypes2.default.func,
  animateYearScrolling: _propTypes2.default.bool
};
DateTimePicker.defaultProps = {
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  autoSubmit: true,
  openTo: viewType.DATE,
  disablePast: false,
  disableFuture: false,
  showTabs: true,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  dateRangeIcon: undefined,
  timeIcon: undefined,
  renderDay: undefined,
  ampm: true,
  shouldDisableDate: undefined,
  animateYearScrolling: false
};
exports.default = (0, _WithUtils2.default)()(DateTimePicker);