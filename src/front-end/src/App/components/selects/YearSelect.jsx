import React from 'react';
import PropTypes from 'prop-types';
import WrappedSelect from './WrappedSelect.jsx';
import Input from "material-ui/Input";


class YearSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {years, onSelect, classes, selectedOption} = this.props;
        console.log(selectedOption);

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{classes,
                          label: 'Год',
                          placeholder: 'Выберите год',
                          value: selectedOption,
                          simpleValue: false,
                          options: years != undefined
                              ? years.map(year => ({label: year, value: year}))
                              : [],
                          onChange: onSelect
                      }}
        />
    }
}

YearSelect.propTypes = {
    years: PropTypes.array,
    onSelect: PropTypes.func,
    selectedOption: PropTypes.object
};

export default YearSelect;