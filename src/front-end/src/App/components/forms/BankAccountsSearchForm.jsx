import React from 'react';
import PropTypes from 'prop-types';
import OrganizationSelect from "../selects/OrganizationSelect.jsx";
import BankSelect from "../selects/BankSelect";
import Button from "material-ui/es/Button/Button";
import {connect} from 'react-redux';

class BankAccountsSearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, selectedOrganizationOption, handleOrganizationSelect, selectedBankOption,
            handleBankSelect, fetchOrganizations, fetchBanks, fetchedOrganizations, fetchedBanks} = this.props;

        return <div>
            <OrganizationSelect selectedOption={selectedOrganizationOption}
                                onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={fetchedOrganizations}
                                onSelect={(option) => handleOrganizationSelect(option)}
            />

            <BankSelect selectedOption={selectedBankOption}
                        onInput={(nameContains) => fetchBanks(nameContains)}
                        banks={fetchedBanks}
                        onSelect={(option) => handleBankSelect(option)}

            />

            <Button variant={'raised'} color={'primary'}>Поиск</Button>
        </div>
    }
}

BankAccountsSearchForm.propTypes = {
    fetchOrganizations: PropTypes.func,
    fetchedOrganizations: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    handleOrganizationSelect: PropTypes.func,
    fetchBanks: PropTypes.func,
    fetchedBanks: PropTypes.func,
    selectedBankOption: PropTypes.object,
    handleBankSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    return {

    }
}

