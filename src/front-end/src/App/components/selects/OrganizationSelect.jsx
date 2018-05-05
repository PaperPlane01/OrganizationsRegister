import React from 'react';
import PropTypes from 'prop-types';
import Input from "material-ui/es/Input/Input";
import WrappedSelect from './WrappedSelect.jsx';
import _ from 'lodash';
import {connect} from 'react-redux';
import {loadOrganizationsWithNameContains, handleOrganizationSelect} from "../../actions/organizations-actions";

class OrganizationSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {classes, organizations, selectedOption, onSelect, onInput} = this.props;

        return <Input
            fullWidth={true}
            inputComponent={WrappedSelect}
            inputProps={{
                classes,
                onChange: (option) => onSelect(option),
                placeholder: 'Название предприятия',
                label: 'Название предприятия',
                simpleValue: false,
                value: selectedOption,
                options: organizations != undefined
                    ? organizations.map(organization => ({
                        label: organization.fullName, value: organization}))
                    : [],
                onInputChange: _.debounce(onInput, 300)
            }}
        />
    }
}

OrganizationSelect.propTypes = {
    onSelect: PropTypes.func,
    classes: PropTypes.object,
    organizations: PropTypes.array,
    selectedOption: PropTypes.object,
    fetchData: PropTypes.func,
    onInput: PropTypes.func,
    handleOrganizationSelect: PropTypes.func
};

export default OrganizationSelect;