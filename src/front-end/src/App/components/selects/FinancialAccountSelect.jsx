import React from 'react';
import PropTypes from 'prop-types';
import WrappedSelect from './WrappedSelect.jsx';
import {Input} from "material-ui";
import _ from 'lodash';

class FinancialAccountSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onSelect, onInput, classes, financialAccounts, selectedOption} = this.props;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes,
                          onChange: onSelect,
                          simpleValue: false,
                          options: financialAccounts != undefined
                              ? financialAccounts.map(financialAccount => ({label: financialAccount.name,
                                  value: financialAccount}))
                              : [],
                          onInputChange: _.debounce(onInput, 150),
                          placeholder: 'Выберите бухгалтеркский счёт (начните печатать)',
                          value: selectedOption
                      }}
        />
    }
}

FinancialAccountSelect.propTypes = {
    onSelect: PropTypes.func,
    classes: PropTypes.object,
    financialAccounts: PropTypes.array,
    selectedOption: PropTypes.object,
    onInput: PropTypes.func
};

export default FinancialAccountSelect;