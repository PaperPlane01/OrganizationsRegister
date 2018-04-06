'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = require('../constants/prop-types');

var _propTypes4 = _interopRequireDefault(_propTypes3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/sort-comp */
/* eslint-disable react/require-default-props */
var PickerBase = function (_PureComponent) {
  (0, _inherits3.default)(PickerBase, _PureComponent);

  function PickerBase() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PickerBase);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PickerBase.__proto__ || (0, _getPrototypeOf2.default)(PickerBase)).call.apply(_ref, [this].concat(args))), _this), _this.getValidDateOrCurrent = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;
      var utils = props.utils,
          value = props.value;

      var date = utils.date(value);

      return utils.isValid(date) && value !== null ? date : utils.date();
    }, _this.state = {
      date: _this.getValidDateOrCurrent()
    }, _this.getFormat = function () {
      if (_this.props.format || _this.props.labelFunc) {
        return _this.props.format;
      }

      return _this.props.ampm ? _this.default12hFormat : _this.default24hFormat;
    }, _this.getRef = function (node) {
      _this.wrapper = node;
    }, _this.handleClear = function () {
      _this.props.onChange(null);
    }, _this.handleAccept = function () {
      _this.props.onChange(_this.state.date);
    }, _this.handleDismiss = function () {
      _this.setState({ date: _this.getValidDateOrCurrent(_this.props) });
    }, _this.handleChange = function (date) {
      var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _this.setState({ date: date }, function () {
        if (isFinish && _this.props.autoOk) {
          _this.handleAccept();
          _this.wrapper.close();
        }
      });
    }, _this.handleTextFieldChange = function (date) {
      if (date === null) {
        _this.handleClear();
      } else {
        _this.setState({ date: date }, _this.handleAccept);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PickerBase, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.utils.isEqual(this.state.date, nextProps.value)) {
        this.setState({ date: this.getValidDateOrCurrent(nextProps) });
      }
    }
  }]);
  return PickerBase;
}(_react.PureComponent);

PickerBase.propTypes = {
  value: _propTypes4.default.date,
  onChange: _propTypes2.default.func.isRequired,
  autoOk: _propTypes2.default.bool,
  format: _propTypes2.default.string,
  labelFunc: _propTypes2.default.func,
  ampm: _propTypes2.default.bool,
  utils: _propTypes2.default.object.isRequired
};
exports.default = PickerBase;