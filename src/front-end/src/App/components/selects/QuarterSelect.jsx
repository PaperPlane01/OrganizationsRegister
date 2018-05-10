import React from 'react';
import WrappedSelect from './WrappedSelect.jsx';
import PropTypes from 'prop-types';
import Input from "material-ui/Input";

class QuarterSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes, quarters, selectedOption, onSelect} = this.props;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes,
                          label: 'Квартал',
                          placeholder: 'Выберите квартал',
                          value: selectedOption,
                          simpleValue: false,
                          onChange: onSelect,
                          options: quarters != undefined
                              ? quarters.map(quarter => ({label: quarter, value: quarter}))
                              : []
                      }}
        />
    }
}

QuarterSelect.propTypes = {
    onSelect: PropTypes.func,
    selectedOption: PropTypes.object,
    quarters: PropTypes.array
};

export default QuarterSelect;