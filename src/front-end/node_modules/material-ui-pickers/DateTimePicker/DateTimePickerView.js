'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerView = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimePickerView = exports.DateTimePickerView = function DateTimePickerView(props) {
  var view = props.view,
      selected = props.selected,
      children = props.children,
      classes = props.classes;


  if (view !== selected) {
    return null;
  }

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames3.default)((0, _defineProperty3.default)({}, classes.hidden, view !== selected)) },
    children
  );
};

DateTimePickerView.propTypes = {
  view: _propTypes2.default.string.isRequired,
  selected: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.node.isRequired,
  classes: _propTypes2.default.object.isRequired
};

var styles = {};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiPickerDTPickerView ' })(DateTimePickerView);