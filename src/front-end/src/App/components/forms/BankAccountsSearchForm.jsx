import React from 'react';
import PropTypes from 'prop-types';
import {OrganizationSelect, BankSelect} from "../selects";
import Button from "material-ui/Button";
import {connect} from 'react-redux';
import Input from "material-ui/Input";
import ValidationResult from "../../validation/ValidationResult";
import {validateBankAccountId} from "../../actions/bank-accounts-actions";
import {fetchOrganizationsByName, handleOrganizationSelect} from "../../actions/organizations-actions";
import {fetchBanksByName, handleBankSelect} from "../../actions/bank-actions";
import Typography from "material-ui/Typography";
import {errorLabelStyle, formStyle} from "../../styles";
import compose from 'recompose/compose';
import withStyles from "material-ui/styles/withStyles";

const styles = theme => formStyle(theme);

class BankAccountsSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            formValidationResult: new ValidationResult(true, '')
        }
    }

    handleId = (id) => {
        this.setState({id}, () => this.props.validateId(this.state.id, true));
    };

    handleSearchRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                const {id} = this.state;
                const {selectedOrganizationOption, selectedBankOption} = this.props;

                const organization = selectedOrganizationOption == undefined ? null : selectedOrganizationOption.value;
                const bank = selectedBankOption == undefined ? null : selectedBankOption.value;

                this.props.onFormSubmitted({id, organization, bank});
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {id} = this.state;
        const {validateId, idValidationResult} = this.props;

        validateId(id, true);

        if (idValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        } else {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
        }
    }

    render() {
        const {classes, selectedOrganizationOption, handleOrganizationSelect, selectedBankOption,
            handleBankSelect, fetchOrganizations, fetchBanks, fetchedOrganizations, fetchedBanks, idValidationResult}
            = this.props;
        const {formValidationResult} = this.state;

        return <div>
            <Typography variant="headline">Поиск банковских счетов</Typography>
            {!idValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {idValidationResult.getMessage()}
                </Typography>
                : ''}
            <Typography variant="body1">Код банковского счёта:</Typography>
            <Input fullWidth={true}
                   onChange={(event) => this.handleId(event.target.value)}
                   placeholder={'Введите код банковского счёта'}
            />

            <Typography variant="body1">Предприятие:</Typography>
            <OrganizationSelect selectedOption={selectedOrganizationOption}
                                onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={fetchedOrganizations}
                                onSelect={(option) => handleOrganizationSelect(option)}
                                classes={classes}
            />

            <Typography variant="body1">Банк:</Typography>
            <BankSelect selectedOption={selectedBankOption}
                        onInput={(nameContains) => fetchBanks(nameContains)}
                        banks={fetchedBanks}
                        onSelect={(option) => handleBankSelect(option)}
                        classes={classes}
            />

            {!formValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {formValidationResult.getMessage()}
                </Typography>
                : ''}
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleSearchRequest()}>Поиск</Button>
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
    onFormSubmitted: PropTypes.func,
    validateId: PropTypes.func,
    idValidationResult: PropTypes.object
};

const mapStateToProps = (state) => {
    const {bankAccountsSearchPage} = state;
    const {validation, organizationSelect, bankSelect} = bankAccountsSearchPage;

    return {
        fetchedOrganizations: organizationSelect.data.dataSource,
        selectedOrganizationOption: organizationSelect.data.selectedOption,
        fetchedBanks: bankSelect.data.dataSource,
        selectedBankOption: bankSelect.data.selectedOption,
        idValidationResult: validation.idValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateId: (id, acceptEmpty) => dispatch(validateBankAccountId(id, acceptEmpty)),
        fetchOrganizations: (name) => dispatch(fetchOrganizationsByName(name)),
        fetchBanks: (name) => dispatch(fetchBanksByName(name)),
        handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
        handleBankSelect: (option) => dispatch(handleBankSelect(option))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(BankAccountsSearchForm);