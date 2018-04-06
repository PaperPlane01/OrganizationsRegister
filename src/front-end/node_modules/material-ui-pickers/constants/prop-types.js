'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var date = _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.instanceOf(Date)]);

exports.default = {
  date: date
};