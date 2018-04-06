import React from 'react';
import {Input} from "material-ui";
import PropTypes from 'prop-types';
import WrappedSelect from "./WrappedSelect.jsx";

class OrganizationTypeSelect extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes, onSelect, selectedOption, organizationTypes} = this.props;

        return <Input fullWidth={true}
                      inputComponent={WrappedSelect}
                      inputProps={{
                          classes: classes,
                          onChange: onSelect,
                          label: 'Тип организации',
                          placeholder: 'Выберите тип организации',
                          simpleValue: false,
                          value: selectedOption,
                          options: organizationTypes !== undefined
                              ? organizationTypes.map(organizationType => ({
                                  label: organizationType.name, value: organizationType
                              }))
                              : []
                      }}
        />
    }
}

OrganizationTypeSelect.propTypes = {
    onSelect: PropTypes.func,
    organizationTypes: PropTypes.array,
    selectedOption: PropTypes.object,
    classes: PropTypes.object
};

export default OrganizationTypeSelect;