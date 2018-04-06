import React from 'react';
import PropTypes from 'prop-types';
import WrappedSelect from './WrappedSelect.jsx';
import Input from "material-ui/es/Input/Input";


class YearSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null
        }
    }

    render() {
        const {years, onSelect, classes, selectedYear} = this.props;
        let selectedOption = selectedYear != undefined ?
            () => ({label: selectedYear, value: selectedYear})
            : null;
        let options = years != undefined ? (years.map(year => ({label: year, value: year}))) : [];

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{classes,
                          label: 'Год',
                          placeholder: 'Выберите год',
                          value: selectedOption,
                          simpleValue: false,
                          options: options,
                          onChange: onSelect
                      }}/>
    }
}

YearSelect.propTypes = {
    years: PropTypes.array,
    onSelect: PropTypes.func,
    selectedYear: PropTypes.number
};

export default YearSelect;