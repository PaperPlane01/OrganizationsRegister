'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = undefined;

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

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _CalendarHeader = require('./CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _DayWrapper = require('./DayWrapper');

var _DayWrapper2 = _interopRequireDefault(_DayWrapper);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */
var Calendar = exports.Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentMonth: _this.props.utils.getStartOfMonth(_this.props.date)
    }, _this.onDateSelect = function (day) {
      var _this$props = _this.props,
          date = _this$props.date,
          utils = _this$props.utils;


      var withHours = utils.setHours(day, utils.getHours(date));
      var withMinutes = utils.setMinutes(withHours, utils.getMinutes(date));

      _this.props.onChange(withMinutes);
    }, _this.handleChangeMonth = function (newMonth) {
      _this.setState({ currentMonth: newMonth });
    }, _this.validateMinMaxDate = function (day) {
      var _this$props2 = _this.props,
          minDate = _this$props2.minDate,
          maxDate = _this$props2.maxDate,
          utils = _this$props2.utils;


      return minDate && utils.isBeforeDay(day, utils.date(minDate)) || maxDate && utils.isAfterDay(day, utils.date(maxDate));
    }, _this.shouldDisablePrevMonth = function () {
      var _this$props3 = _this.props,
          utils = _this$props3.utils,
          disablePast = _this$props3.disablePast,
          minDate = _this$props3.minDate;

      var now = utils.date();
      return !utils.isBefore(utils.getStartOfMonth(disablePast && utils.isAfter(now, minDate) ? now : utils.date(minDate)), _this.state.currentMonth);
    }, _this.shouldDisableNextMonth = function () {
      var _this$props4 = _this.props,
          utils = _this$props4.utils,
          disableFuture = _this$props4.disableFuture,
          maxDate = _this$props4.maxDate;

      var now = utils.date();
      return !utils.isAfter(utils.getStartOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : utils.date(maxDate)), _this.state.currentMonth);
    }, _this.shouldDisableDate = function (day) {
      var _this$props5 = _this.props,
          disablePast = _this$props5.disablePast,
          disableFuture = _this$props5.disableFuture,
          shouldDisableDate = _this$props5.shouldDisableDate,
          utils = _this$props5.utils;


      return disableFuture && utils.isAfterDay(day, utils.date()) || disablePast && utils.isBeforeDay(day, utils.date()) || _this.validateMinMaxDate(day) || shouldDisableDate(day);
    }, _this.moveToDay = function (day) {
      if (day && !_this.shouldDisableDate(day)) {
        _this.props.onChange(day);
      }
    }, _this.handleKeyDown = function (event) {
      var _this$props6 = _this.props,
          theme = _this$props6.theme,
          date = _this$props6.date,
          utils = _this$props6.utils;


      switch ((0, _keycode2.default)(event)) {
        case 'up':
          _this.moveToDay(utils.addDays(date, -7));
          break;
        case 'down':
          _this.moveToDay(utils.addDays(date, 7));
          break;
        case 'left':
          theme.direction === 'ltr' ? _this.moveToDay(utils.addDays(date, -1)) : _this.moveToDay(utils.addDays(date, 1));
          break;
        case 'right':
          theme.direction === 'ltr' ? _this.moveToDay(utils.addDays(date, 1)) : _this.moveToDay(utils.addDays(date, -1));
          break;
        default:
          // if keycode is not handled, stop execution
          return;
      }

      // if event was handled prevent other side effects (e.g. page scroll)
      event.preventDefault();
    }, _this.renderWeeks = function () {
      var utils = _this.props.utils;
      var currentMonth = _this.state.currentMonth;

      var weeks = utils.getWeekArray(currentMonth);

      return weeks.map(function (week) {
        return _react2.default.createElement(
          'div',
          {
            key: 'week-' + week[0].toString(),
            className: _this.props.classes.week
          },
          _this.renderDays(week)
        );
      });
    }, _this.renderDays = function (week) {
      var _this$props7 = _this.props,
          date = _this$props7.date,
          renderDay = _this$props7.renderDay,
          utils = _this$props7.utils;


      var selectedDate = utils.startOfDay(date);
      var currentMonthNumber = utils.getMonth(_this.state.currentMonth);
      var now = utils.date();

      return week.map(function (day) {
        var disabled = _this.shouldDisableDate(day);
        var dayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

        var dayComponent = _react2.default.createElement(
          _Day2.default,
          {
            current: utils.isSameDay(day, now),
            hidden: !dayInCurrentMonth,
            disabled: disabled,
            selected: utils.isSameDay(selectedDate, day)
          },
          utils.getDayText(day)
        );

        if (renderDay) {
          dayComponent = renderDay(day, selectedDate, dayInCurrentMonth, dayComponent);
        }

        return _react2.default.createElement(
          _DayWrapper2.default,
          {
            key: day.toString(),
            value: day,
            dayInCurrentMonth: dayInCurrentMonth,
            disabled: disabled,
            onSelect: _this.onDateSelect
          },
          dayComponent
        );
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        currentMonth: this.props.utils.getStartOfMonth(nextProps.date)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var currentMonth = this.state.currentMonth;
      var _props = this.props,
          classes = _props.classes,
          utils = _props.utils;


      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(_reactEventListener2.default, { target: 'window', onKeyDown: this.handleKeyDown }),
        _react2.default.createElement(_CalendarHeader2.default, {
          currentMonth: currentMonth,
          onMonthChange: this.handleChangeMonth,
          leftArrowIcon: this.props.leftArrowIcon,
          rightArrowIcon: this.props.rightArrowIcon,
          disablePrevMonth: this.shouldDisablePrevMonth(),
          disableNextMonth: this.shouldDisableNextMonth(),
          utils: utils
        }),
        _react2.default.createElement(
          'div',
          { className: classes.calendar },
          this.renderWeeks()
        )
      );
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  date: _propTypes2.default.object.isRequired,
  minDate: _propTypes4.default.date,
  maxDate: _propTypes4.default.date,
  classes: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  disablePast: _propTypes2.default.bool,
  disableFuture: _propTypes2.default.bool,
  leftArrowIcon: _propTypes2.default.node,
  rightArrowIcon: _propTypes2.default.node,
  renderDay: _propTypes2.default.func,
  /** @ignore */
  theme: _propTypes2.default.object.isRequired,
  shouldDisableDate: _propTypes2.default.func,
  utils: _propTypes2.default.object.isRequired
};
Calendar.defaultProps = {
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  disablePast: false,
  disableFuture: false,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  renderDay: undefined,
  shouldDisableDate: function shouldDisableDate() {
    return false;
  }
};


var styles = function styles(theme) {
  return {
    calendar: {
      height: 36 * 6,
      marginTop: theme.spacing.unit * 1.5
    },
    week: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, {
  name: 'MuiPickersCalendar',
  withTheme: true
})((0, _WithUtils2.default)()(Calendar));