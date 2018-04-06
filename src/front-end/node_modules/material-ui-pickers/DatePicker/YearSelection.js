'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YearSelection = undefined;

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

var _reactDom = require('react-dom');

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

var _Year = require('./Year');

var _Year2 = _interopRequireDefault(_Year);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YearSelection = exports.YearSelection = function (_PureComponent) {
  (0, _inherits3.default)(YearSelection, _PureComponent);

  function YearSelection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, YearSelection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = YearSelection.__proto__ || (0, _getPrototypeOf2.default)(YearSelection)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      _this.scrollToCurrentYear();
    }, _this.onYearSelect = function (year) {
      var _this$props = _this.props,
          date = _this$props.date,
          onChange = _this$props.onChange,
          utils = _this$props.utils;


      var newDate = utils.setYear(date, year);
      onChange(newDate);
    }, _this.getSelectedYearRef = function (ref) {
      _this.selectedYearRef = ref;
    }, _this.scrollToCurrentYear = function () {
      var animateYearScrolling = _this.props.animateYearScrolling;

      var currentYearElement = (0, _reactDom.findDOMNode)(_this.selectedYearRef);

      if (currentYearElement) {
        currentYearElement.scrollIntoView({
          behavior: animateYearScrolling ? 'smooth' : 'auto'
        });
      }
    }, _this.selectedYearRef = undefined, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(YearSelection, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          date = _props.date,
          classes = _props.classes,
          disablePast = _props.disablePast,
          disableFuture = _props.disableFuture,
          utils = _props.utils;

      var currentYear = utils.getYear(date);

      return _react2.default.createElement(
        'div',
        { className: classes.container },
        utils.getYearRange(minDate, maxDate).map(function (year) {
          var yearNumber = utils.getYear(year);
          var selected = yearNumber === currentYear;

          return _react2.default.createElement(
            _Year2.default,
            {
              selected: selected,
              disabled: disablePast && utils.isBeforeYear(year, utils.date()) || disableFuture && utils.isAfterYear(year, utils.date()),
              value: yearNumber,
              key: utils.getYearText(year),
              onSelect: _this2.onYearSelect,
              ref: selected ? _this2.getSelectedYearRef : undefined
            },
            utils.getYearText(year)
          );
        })
      );
    }
  }]);
  return YearSelection;
}(_react.PureComponent);

YearSelection.propTypes = {
  date: _propTypes2.default.shape({}).isRequired,
  minDate: _propTypes4.default.date.isRequired,
  maxDate: _propTypes4.default.date.isRequired,
  classes: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  disablePast: _propTypes2.default.bool.isRequired,
  disableFuture: _propTypes2.default.bool.isRequired,
  animateYearScrolling: _propTypes2.default.bool,
  utils: _propTypes2.default.object.isRequired
};
YearSelection.defaultProps = {
  animateYearScrolling: false
};


var styles = {
  container: {
    maxHeight: 300,
    overflowY: 'auto',
    justifyContent: 'center'
  }
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickersYearSelection' })((0, _WithUtils2.default)()(YearSelection));