import React from 'react';
import PropTypes from 'prop-types';
import {OrganizationSelect, BankSelect} from "../selects";
import Button from "material-ui/es/Button/Button";
import {connect} from 'react-redux';
import Input from "material-ui/es/Input/Input";
import ValidationResult from "../../validation/ValidationResult";
import {validateBankAccountId} from "../../actions/bank-accounts-actions";
import {fetchOrganizationsByName, handleOrganizationSelect} from "../../actions/organizations-actions";
import {fetchBanksByName, handleBankSelect} from "../../actions/bank-actions";
import Typography from "material-ui/es/Typography/Typography";
import {errorLabelStyle, formStyle} from "../../styles";
import compose from 'recompose/compose';
import withStyles from "material-ui/es/styles/withStyles";
import {fetchCurrentUser} from "../../actions/user-actions";

const styles = theme => formStyle(theme);

class BankAccountAddingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            formValidationResult: new ValidationResult(true, '')
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.fetchedBanks);
    }

    handleId = (id) => {
        this.setState({id}, () => this.props.validateId(id, false));
    };

    handleAddBankAccountRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                const {selectedOrganizationOption, selectedBankOption} = this.props;
                const {id} = this.state;

                const bank = selectedBankOption.value;
                const organization = selectedOrganizationOption.value;

                this.props.onFormSubmitted({id, bank, organization});
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {selectedOrganizationOption, selectedBankOption, validateId, idValidationResult} = this.props;
        const {id} = this.state;

        validateId(id, false);

        if (!idValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
            return;
        }

        if (selectedOrganizationOption == undefined || selectedBankOption == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые обязательные поля не заполнены')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')});
    }

    render() {
        const {classes, selectedOrganizationOption, handleOrganizationSelect, selectedBankOption,
            handleBankSelect, fetchOrganizations, fetchBanks, fetchedOrganizations, fetchedBanks, idValidationResult}
            = this.props;
        const {formValidationResult} = this.state;

        return <div>
            <Typography variant="headline">Добавление банковского счёта</Typography>
            {!idValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {idValidationResult.getMessage()}
                </Typography>
                : ''}
            <Typography variant="body1">Код банковского счёта (обязательно):</Typography>
            <Input fullWidth={true}
                   onChange={(event) => this.handleId(event.target.value)}
                   placeholder={'Введите код банковского счёта'}
            />

            <Typography variant="body1">Предприятие (обязательно):</Typography>
            <OrganizationSelect selectedOption={selectedOrganizationOption}
                                onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={fetchedOrganizations}
                                onSelect={(option) => handleOrganizationSelect(option)}
                                classes={classes}
            />

            <Typography variant="body1">Банк (обязательно):</Typography>
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
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleAddBankAccountRequest()}>
                Добавить банковский счёт
            </Button>
        </div>
    }
}

BankAccountAddingForm.propTypes = {
    fetchOrganizations: PropTypes.func,
    fetchedOrganizations: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    handleOrganizationSelect: PropTypes.func,
    fetchBanks: PropTypes.func,
    fetchedBanks: PropTypes.array,
    selectedBankOption: PropTypes.object,
    handleBankSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func,
    validateId: PropTypes.func,
    idValidationResult: PropTypes.object,
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func
};

const mapStateToProps = (state) => {
    const {bankAccountAddingPage, userData} = state;
    const {bankSelect, organizationSelect, validation} = bankAccountAddingPage;

    return {
        fetchedBanks: bankSelect.data.dataSource,
        selectedBankOption: bankSelect.data.selectedOption,
        fetchedOrganizations: organizationSelect.data.dataSource,
        selectedOrganizationOption: organizationSelect.data.selectedOption,
        idValidationResult: validation.idValidationResult,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrganizations: (nameContains) => dispatch(fetchOrganizationsByName(nameContains)),
        handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
        fetchBanks: (nameContains) => dispatch(fetchBanksByName(nameContains)),
        handleBankSelect: (option) => dispatch(handleBankSelect(option)),
        validateId: (id, acceptEmpty) => dispatch(validateBankAccountId(id, acceptEmpty)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(BankAccountAddingForm);