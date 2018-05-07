import React from 'react';
import PropTypes from 'prop-types';
import WrappedSelect from './WrappedSelect.jsx';
import {Input} from "material-ui";
import _ from 'lodash';

class BankSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onSelect, onInput, classes, banks, selectedOption} = this.props;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes,
                          onChange: onSelect,
                          simpleValue: false,
                          options: banks != undefined
                              ? banks.map(bank => ({label: bank.name, value: bank}))
                              : [],
                          onInputChange: _.debounce(onInput, 150),
                          placeholder: 'Выберите банк (начните печатать)',
                          value: selectedOption
                      }}
        />
    }
}

BankSelect.propTypes = {
    onSelect: PropTypes.func,
    classes: PropTypes.object,
    banks: PropTypes.array,
    selectedOption: PropTypes.object,
    onInput: PropTypes.func
};

export default BankSelect;