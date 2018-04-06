'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimePickerHeader = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withStyles = require('material-ui/styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

var _PickerToolbar = require('../_shared/PickerToolbar');

var _PickerToolbar2 = _interopRequireDefault(_PickerToolbar);

var _ToolbarButton = require('../_shared/ToolbarButton');

var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

var _WithUtils = require('../_shared/WithUtils');

var _WithUtils2 = _interopRequireDefault(_WithUtils);

var _datePickerView = require('../constants/date-picker-view');

var viewType = _interopRequireWildcard(_datePickerView);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateTimePickerHeader = exports.DateTimePickerHeader = function DateTimePickerHeader(props) {
  var date = props.date,
      classes = props.classes,
      openView = props.openView,
      meridiemMode = props.meridiemMode,
      onOpenViewChange = props.onOpenViewChange,
      setMeridiemMode = props.setMeridiemMode,
      theme = props.theme,
      utils = props.utils,
      ampm = props.ampm;


  var changeOpenView = function changeOpenView(view) {
    return function () {
      return onOpenViewChange(view);
    };
  };

  var rtl = theme.direction === 'rtl';
  var hourMinuteClassName = rtl ? classes.hourMinuteLabelReverse : classes.hourMinuteLabel;

  return _react2.default.createElement(
    _PickerToolbar2.default,
    { className: classes.toolbar },
    _react2.default.createElement(
      'div',
      { className: classes.dateHeader },
      _react2.default.createElement(_ToolbarButton2.default, {
        variant: 'subheading',
        onClick: changeOpenView(viewType.YEAR),
        selected: openView === viewType.YEAR,
        label: utils.getYearText(date)
      }),
      _react2.default.createElement(_ToolbarButton2.default, {
        variant: 'display1',
        onClick: changeOpenView(viewType.DATE),
        selected: openView === viewType.DATE,
        label: utils.getDateTimePickerHeaderText(date)
      })
    ),
    _react2.default.createElement(
      'div',
      { className: classes.timeHeader },
      _react2.default.createElement(
        'div',
        { className: hourMinuteClassName },
        _react2.default.createElement(_ToolbarButton2.default, {
          variant: 'display2',
          onClick: changeOpenView(viewType.HOUR),
          selected: openView === viewType.HOUR,
          label: utils.getHourText(date, ampm)
        }),
        _react2.default.createElement(_ToolbarButton2.default, {
          variant: 'display2',
          label: ':',
          selected: false,
          className: classes.separator
        }),
        _react2.default.createElement(_ToolbarButton2.default, {
          variant: 'display2',
          onClick: changeOpenView(viewType.MINUTES),
          selected: openView === viewType.MINUTES,
          label: utils.getMinuteText(date)
        })
      ),
      ampm && _react2.default.createElement(
        'div',
        { className: classes.ampmSelection },
        _react2.default.createElement(_ToolbarButton2.default, {
          className: classes.ampmLabel,
          selected: meridiemMode === 'am',
          type: 'subheading',
          label: utils.getMeridiemText('am'),
          onClick: setMeridiemMode('am')
        }),
        _react2.default.createElement(_ToolbarButton2.default, {
          className: classes.ampmLabel,
          selected: meridiemMode === 'pm',
          type: 'subheading',
          label: utils.getMeridiemText('pm'),
          onClick: setMeridiemMode('pm')
        })
      )
    )
  );
};

DateTimePickerHeader.propTypes = {
  date: _propTypes2.default.object.isRequired,
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired,
  meridiemMode: _propTypes2.default.string.isRequired,
  openView: _propTypes2.default.string.isRequired,
  onOpenViewChange: _propTypes2.default.func.isRequired,
  setMeridiemMode: _propTypes2.default.func.isRequired,
  utils: _propTypes2.default.object.isRequired,
  ampm: _propTypes2.default.bool
};

DateTimePickerHeader.defaultProps = {
  ampm: true
};

var styles = function styles() {
  return {
    toolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      justifyContent: 'space-around'
    },
    separator: {
      margin: '0 4px 0 2px',
      cursor: 'default'
    },
    ampmSelection: {
      marginLeft: 10,
      marginRight: -10
    },
    ampmLabel: {
      fontSize: 18
    },
    hourMinuteLabel: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    hourMinuteLabelReverse: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flexDirection: 'row-reverse'
    },
    dateHeader: {
      height: 65
    },
    timeHeader: {
      height: 65,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    }
  };
};

exports.default = (0, _withStyles2.default)(styles, { withTheme: true })((0, _WithUtils2.default)()(DateTimePickerHeader));