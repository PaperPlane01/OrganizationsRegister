import React from 'react';
import WrappedSelect from  './WrappedSelect.jsx';
import PropTypes from 'prop-types';
import Input from "material-ui/es/Input/Input";

class QuarterSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quartersOptions: [1, 2, 3, 4].map(quarter => ({label: quarter, value: quarter})),
        }
    }

    render() {
        let {classes, selectedQuarter, onSelect} = this.props;

        const selectedOption = selectedQuarter != undefined ? {label: selectedQuarter, value: selectedQuarter} : null;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes,
                          label: 'Квартал',
                          placeholder: 'Выберите квартал',
                          value: selectedOption,
                          simpleValue: false,
                          onChange: onSelect,
                          options: this.state.quartersOptions
                      }}
        />
    }
}

QuarterSelect.propTypes = {
    onSelect: PropTypes.func,
    selectedQuarter: PropTypes.number
};

export default QuarterSelect;