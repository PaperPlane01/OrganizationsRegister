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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withUtils = function withUtils() {
  return function (Component) {
    var WithUtils = function WithUtils(_ref, context) {
      var pickerRef = _ref.pickerRef,
          other = (0, _objectWithoutProperties3.default)(_ref, ['pickerRef']);

      if (!context.muiPickersDateUtils) {
        // eslint-disable-next-line no-console
        console.error('Utils should be provided');
      }

      return _react2.default.createElement(Component, (0, _extends3.default)({ ref: pickerRef, utils: context.muiPickersDateUtils }, other));
    };

    WithUtils.displayName = 'WithUtils(' + (Component.displayName || Component.name) + ')';

    WithUtils.contextTypes = {
      muiPickersDateUtils: _propTypes2.default.object
    };

    WithUtils.propTypes = {
      pickerRef: _propTypes2.default.func
    };

    WithUtils.defaultProps = {
      pickerRef: undefined
    };

    return WithUtils;
  };
};

exports.default = withUtils;