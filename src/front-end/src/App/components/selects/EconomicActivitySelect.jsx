import React from 'react';
import PropTypes from 'prop-types';
import WrappedSelect from './WrappedSelect.jsx';
import {Input} from "material-ui";
import _ from 'lodash';

class EconomicActivitySelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, multipleSelectEnabled, economicActivities,
            selectedOptions, onInput, onSelect} = this.props;

        let placeholder = multipleSelectEnabled ? 'Выберите хозязйственные деятельности (начните печатать)'
            : 'Выберите хозяйственную деятельность (начните печатать)';

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes,
                          onChange: onSelect,
                          multi: multipleSelectEnabled,
                          simpleValue: false,
                          options: economicActivities != undefined
                              ? economicActivities.map(economicActivity => ({
                                  label: economicActivity.name,
                                  value: economicActivity}))
                              : [],
                          onInputChange: _.debounce(onInput, 150),
                          placeholder: placeholder,
                          value: selectedOptions
                      }}
        />
    }
}

EconomicActivitySelect.propTypes = {
    onSelect: PropTypes.func,
    classes: PropTypes.object,
    economicActivities: PropTypes.array,
    selectedOptions: PropTypes.array,
    onInput: PropTypes.func,
    multipleSelectEnabled: PropTypes.bool
};

export default EconomicActivitySelect;