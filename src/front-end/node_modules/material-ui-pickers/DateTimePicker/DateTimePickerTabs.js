'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerTabs = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _withTheme = require('material-ui/styles/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Tabs = require('material-ui/Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('material-ui/Tabs/Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Icon = require('material-ui/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _datePickerView = require('../constants/date-picker-view');

var viewType = _interopRequireWildcard(_datePickerView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewToTabIndex = function viewToTabIndex(openView) {
  if (openView === viewType.DATE || openView === viewType.YEAR) {
    return 'date';
  }

  return 'time';
};

var tabIndexToView = function tabIndexToView(tab) {
  if (tab === 'date') {
    return viewType.DATE;
  }

  return viewType.HOUR;
};

var DateTimePickerTabs = exports.DateTimePickerTabs = function DateTimePickerTabs(props) {
  var view = props.view,
      onChange = props.onChange,
      classes = props.classes,
      theme = props.theme,
      dateRangeIcon = props.dateRangeIcon,
      timeIcon = props.timeIcon;


  var indicatorColor = theme.palette.type === 'light' ? 'secondary' : 'primary';
  var handleChange = function handleChange(e, value) {
    if (value !== viewToTabIndex(view)) {
      onChange(tabIndexToView(value));
    }
  };

  return _react2.default.createElement(
    _Paper2.default,
    null,
    _react2.default.createElement(
      _Tabs2.default,
      {
        fullWidth: true,
        value: viewToTabIndex(view),
        onChange: handleChange,
        className: classes.tabs,
        indicatorColor: indicatorColor
      },
      _react2.default.createElement(_Tab2.default, { value: 'date', icon: _react2.default.createElement(
          _Icon2.default,
          null,
          dateRangeIcon
        ) }),
      _react2.default.createElement(_Tab2.default, { value: 'time', icon: _react2.default.createElement(
          _Icon2.default,
          null,
          timeIcon
        ) })
    )
  );
};

DateTimePickerTabs.propTypes = {
  view: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  dateRangeIcon: _propTypes2.default.node,
  timeIcon: _propTypes2.default.node
};

DateTimePickerTabs.defaultProps = {
  dateRangeIcon: 'date_range',
  timeIcon: 'access_time'
};

var styles = function styles(theme) {
  return {
    tabs: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.primary.main : theme.palette.background.default
    }
  };
};

exports.default = (0, _withTheme2.default)()((0, _withStyles2.default)(styles, { name: 'MuiPickerDTTabs' })(DateTimePickerTabs));