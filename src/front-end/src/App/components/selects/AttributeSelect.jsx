import React from 'react';
import PropTypes from 'prop-types';
import WrappedSelect from './WrappedSelect.jsx';
import {Input} from "material-ui";

class AttributeSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, onSelect, selectedOption, attributes} = this.props;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes,
                          onChange: onSelect,
                          simpleValue: false,
                          options: attributes != undefined
                              ? attributes.map(attribute => ({label: attribute, value: attribute}))
                              : [],
                          placeholder: 'Выберите признак',
                          value: selectedOption
                      }}/>
    }
};

AttributeSelect.propTypes = {
    onSelect: PropTypes.func,
    selectedOption: PropTypes.object,
    attributes: PropTypes.array
};

export default AttributeSelect;