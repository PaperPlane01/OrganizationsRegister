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

var _reactTextMask = require('react-text-mask');

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function (_PureComponent) {
  (0, _inherits3.default)(Input, _PureComponent);

  function Input() {
    (0, _classCallCheck3.default)(this, Input);
    return (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).apply(this, arguments));
  }

  (0, _createClass3.default)(Input, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          inputRef = _props.inputRef,
          props = (0, _objectWithoutProperties3.default)(_props, ['inputRef']);

      return this.props.mask ? _react2.default.createElement(_reactTextMask2.default, (0, _extends3.default)({}, props, { ref: inputRef })) : _react2.default.createElement('input', (0, _extends3.default)({}, props, { ref: inputRef }));
    }
  }]);
  return Input;
}(_react.PureComponent);

Input.propTypes = {
  mask: _propTypes2.default.any,
  inputRef: _propTypes2.default.func.isRequired
};
Input.defaultProps = {
  mask: undefined
};
exports.default = Input;