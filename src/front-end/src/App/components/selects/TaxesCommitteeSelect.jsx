import React from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types';
import Input from "material-ui/es/Input/Input";
import WrappedSelect from './WrappedSelect.jsx';

class TaxesCommitteeSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes, taxesCommittees, selectedOption, onInput, onSelect} = this.props;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{classes,
                          onChange: onSelect,
                          placeholder: 'Выберите налоговый комитет (начните печатать)',
                          simpleValue: false,
                          value: selectedOption,
                          options: taxesCommittees != undefined ? taxesCommittees.map(taxesCommittee => ({
                              label: taxesCommittee.name,
                              value: taxesCommittee
                          })) : [],
                          onInputChange: _.debounce(onInput, 150)
                      }}/>;
    }
}

TaxesCommitteeSelect.propTypes = {
    onSelect: PropTypes.func,
    classes: PropTypes.object,
    taxesCommittees: PropTypes.array,
    selectedOption: PropTypes.object,
    onInput: PropTypes.func
};

export default TaxesCommitteeSelect;