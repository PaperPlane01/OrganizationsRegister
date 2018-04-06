import 'babel-polyfill';
import React from 'react';
import {connect} from 'react-redux';
import {Input, withStyles} from 'material-ui';
import OrganizationTypeSelect from './OrganizationTypeSelect.jsx';
import EconomicActivitySelect from  './EconomicActivitySelect.jsx';
import TaxesCommitteeSelect from './TaxesCommitteeSelect.jsx';
import PropTypes from 'prop-types';
import ValidationResult from '../validation/ValidationResult.js';
import Button from 'material-ui/Button';
import { DatePicker } from 'material-ui-pickers';
import {
    handleMultipleEconomicActivitiesSelect,
    loadEconomicActivitiesWithNameContains
} from "../actions/economic-activites-actions";
import {handleTaxesCommitteeSelect, loadTaxesCommitteesWithNameContains} from "../actions/taxes-committees-actions";
import {handleOrganizationTypeSelect, loadOrganizationsTypes} from "../actions/organizations-types-actions";
import {validateAddress, validateFounder,
    validateFullName, validateMaxNumberOfEmployees, validateMinNumberOfEmployees, validatePhoneNumber, validateShortName
} from "../actions/organizations-actions";
import compose from 'recompose/compose';
import {formStyle} from "../form-style/";

const styles = theme => formStyle(theme);

class OrganizationsSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: null,
            shortName: null,
            minNumberOfEmployees: null,
            maxNumberOfEmployees: null,
            minRegistrationDate: null,
            maxRegistrationDate: null,
            founder: null,
            phoneNumber: null,
            address: null,
            overallValidationResult: new ValidationResult(true, '')
        }
    }

    componentDidMount() {
        this.props.fetchOrganizationsTypes();
    }

    handleOrganizationFullName = fullName => {
        this.setState({fullName: fullName}, () => {
            this.props.validateFullName(this.state.fullName, true);
        })
    };

    handleOrganizationShortName = shortName => {
       this.setState({shortName: shortName}, () => {
           this.props.validateShortName(this.state.shortName, true);
       })
    };

    handleMinNumberOfEmployees = minNumberOfEmployees => {
        this.setState({minNumberOfEmployees: minNumberOfEmployees}, () => {
            this.props.validateMinNumberOfEmployees(this.state.minNumberOfEmployees, true)
        })
    };

    handleMaxNumberOfEmployees = maxNumberOfEmployees => {
        this.setState({maxNumberOfEmployees: maxNumberOfEmployees}, () => {
            this.props.validateMaxNumberOfEmployees(this.state.maxNumberOfEmployees, true);
        })
    };

    handleMinRegistrationDate = minRegistrationDate => {
        this.setState({minRegistrationDate: minRegistrationDate});
    };

    handleMaxRegistrationDate = maxRegistrationDate => {
        this.setState({maxRegistrationDate: maxRegistrationDate});
    };

    handleFounder = founder => {
        this.setState({founder: founder}, () => {
            this.props.validateFounder(this.state.founder, true)
        })
    };

    handleAddress = address => {
        this.setState({address: address}, () => {
            this.props.validateAddress(this.state.address, true);
        })
    };

    handlePhoneNumber = phoneNumber => {
        this.setState({phoneNumber: phoneNumber}, () => {
            this.props.validatePhoneNumber(phoneNumber, true);
        })
    };

    handleSearchRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.overallValidationResult.isSuccessful()) {

                let permittedEconomicActivities = [];

                if (this.props.selectedEconomicActivitiesOptions != undefined) {
                    this.props.selectedEconomicActivitiesOptions.forEach(option => {
                        permittedEconomicActivities.push(option.value);
                    })
                }

                let taxesCommittee = this.props.selectedTaxesCommitteeOption != undefined
                    ? this.props.selectedTaxesCommitteeOption.value
                    : null;
                let organizationType = this.props.selectedOrganizationTypeOption != undefined
                    ? this.props.selectedOrganizationTypeOption.value
                    : null;

                let organizationsSearchCriteria = {
                    fullName: this.state.fullName,
                    shortName: this.state.shortName,
                    permittedEconomicActivities: permittedEconomicActivities,
                    taxesCommittee: taxesCommittee,
                    organizationType: organizationType,
                    minRegistrationDate: this.state.minRegistrationDate,
                    maxRegistrationDate: this.state.maxRegistrationDate,
                    minNumberOfEmployees: this.state.minNumberOfEmployees,
                    maxNumberOfEmployees: this.state.maxNumberOfEmployees,
                    founder: this.state.founder,
                    address: this.state.address
                };

                this.props.onFormSubmitted(organizationsSearchCriteria);
            }
        })
    };

    async assertAllFieldsAreValid() {

        if (!this.props.addressValidationResult.isSuccessful() ||
            !this.props.fullNameValidationResult.isSuccessful() ||
            !this.props.shortNameValidationResult.isSuccessful() ||
            !this.props.phoneNumberValidationResult.isSuccessful() ||
            !this.props.founderValidationResult.isSuccessful() ||
            !this.props.minNumberOfEmployeesValidationResult.isSuccessful() ||
            !this.props.maxNumberOfEmployeesValidationResult.isSuccessful())
        {
            let overallValidationResult = new ValidationResult(false, 'Некоторые поля заполненны неверно.');
            this.setState({overallValidationResult: overallValidationResult});
            return;
        }

        this.setState({overallValidationResult: new ValidationResult(true, '')});
    };

    render() {
        const {classes,
            loadedEconomicActivities,
            handleEconomicActivitiesSelect,
            selectedEconomicActivitiesOptions,
            fetchEconomicActivities,
            loadedTaxesCommittees,
            handleTaxesCommitteeSelect,
            selectedTaxesCommitteeOption,
            fetchTaxesCommittees,
            loadedOrganizationTypes,
            selectedOrganizationTypeOption,
            handleOrganizationTypeSelect
        } = this.props;
        let labelStyle = {'font-family': 'roboto'};
        let errorLabelStyle = {'font-family': 'roboto', 'color': 'red'};

        return <div>
            <h2 style={labelStyle}>Поиск организаций</h2>
            <div style={labelStyle}>Полное название организации:</div>
            {!this.props.fullNameValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.fullNameValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите полное название органиации'}
                   onChange={event => this.handleOrganizationFullName(event.target.value)}
                   fullWidth={true}/>

            <div style={labelStyle}>Сокращённое название организации:</div>
            {!this.props.shortNameValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.shortNameValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите сокращённое название организации'}
                   onChange={event => this.handleOrganizationShortName(event.target.value)}
                   fullWidth={true}/>

            <div style={labelStyle}>Тип организации:</div>
            <OrganizationTypeSelect organizationTypes={loadedOrganizationTypes}
                                    selectedOption={selectedOrganizationTypeOption}
                                    onSelect={option => handleOrganizationTypeSelect(option)}
                                    classes={classes}/><br/>

            <div style={labelStyle}>Выполняемые хозяйственные деятельности:</div>
            <EconomicActivitySelect economicActivities={loadedEconomicActivities}
                                    selectedOptions={selectedEconomicActivitiesOptions}
                                    onSelect={option => handleEconomicActivitiesSelect(option)}
                                    onInput={nameContains => fetchEconomicActivities(nameContains)}
                                    classes={classes}
                                    multipleSelectEnabled={true}/><br/>

            <div style={labelStyle}>Налоговый комитет:</div>
            <TaxesCommitteeSelect taxesCommittees={loadedTaxesCommittees}
                                  selectedOption={selectedTaxesCommitteeOption}
                                  onSelect={option => handleTaxesCommitteeSelect(option)}
                                  onInput={nameContains => fetchTaxesCommittees(nameContains)}
                                  classes={classes}/>

            <div style={labelStyle}>Минимальное количество сотрудников:</div>
            {!this.props.minNumberOfEmployeesValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.minNumberOfEmployeesValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите минимальное количество содтрудников'}
                   onChange={event => this.handleMinNumberOfEmployees(event.target.value)}
                   fullWidth={true}/>

            <div style={labelStyle}>Максимальное количетсво сотрудников:</div>
            {!this.props.maxNumberOfEmployeesValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.maxNumberOfEmployeesValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите максимальное количество сотрудников'}
                   onChange={event => this.handleMaxNumberOfEmployees(event.target.value)}
                   fullWidth={true}/>

            <div style={labelStyle}>Минимальная дата регистрации:</div>
            <DatePicker label={'Выберите минимальную дату регистрации'}
                        clearable
                        disableFuture
                        maxDateMessage={'Дата должна быть не больше сегодняшней.'}
                        value={this.state.minRegistrationDate}
                        onChange={date => this.handleMinRegistrationDate(date)}
                        fullWidth={true}
                        format={'D MMM YYYY'}
                        cancelLabel={'Отменить'}
                        clearLabel={'Очистить'}/>

            <div style={labelStyle}>Максимальная дата регистрации:</div>
            <DatePicker label={'Выберите максимальную дату регистрации'}
                        clearable
                        disableFuture
                        maxDateMessage={'Дата не должна быть больше сегодняшней.'}
                        value={this.state.maxRegistrationDate}
                        onChange={date => this.handleMaxRegistrationDate(date)}
                        fullWidth={true}
                        format={'D MMM YYYY'}
                        cancelLabel={'Отменить'}
                        clearLabel={'Очистить'}/>

            <div style={labelStyle}>Учредитель:</div>
            {!this.props.founderValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.founderValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите учредителя организации'}
                   onChange={event => this.handleFounder(event.target.value)}
                   fullWidth={true}/>

            <div style={labelStyle}>Телефонный номер:</div>
            {!this.props.phoneNumberValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.phoneNumberValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите телефонный номер организации'}
                   onChange={event => this.handlePhoneNumber(event.target.value)}
                   fullWidth={true}/>

            <div style={labelStyle}>Адрес:</div>
            {!this.props.addressValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.props.addressValidationResult.getMessage()}
                </span> : ''}
            <Input placeholder={'Введите адрес организации'}
                   onChange={event => this.handleAddress(event.target.value)}
                   fullWidth={true}/><br/>

            <Button variant={'raised'} color={'primary'} onClick={() => this.handleSearchRequest()}>Поиск</Button>
            {!this.state.overallValidationResult.isSuccessful() ?
                <span style={errorLabelStyle}>
                    {this.state.overallValidationResult.getMessage()}
                </span> : ''}
        </div>
    }
}

OrganizationsSearchForm.propTypes = {
    loadedEconomicActivities: PropTypes.array,
    selectedEconomicActivitiesOptions: PropTypes.array,
    loadedTaxesCommittees: PropTypes.array,
    selectedTaxesCommitteeOption: PropTypes.object,
    loadedOrganizationTypes: PropTypes.array,
    selectedOrganizationTypeOption: PropTypes.object,
    fetchEconomicActivities: PropTypes.func,
    handleEconomicActivitiesSelect: PropTypes.func,
    fetchTaxesCommittees: PropTypes.func,
    handleTaxesCommitteeSelect: PropTypes.func,
    fetchOrganizationsTypes: PropTypes.func,
    handleOrganizationTypeSelect: PropTypes.func,
    validateFullName: PropTypes.func,
    fullNameValidationResult: PropTypes.object,
    validateShortName: PropTypes.func,
    shortNameValidationResult: PropTypes.object,
    validateMinNumberOfEmployees: PropTypes.func,
    minNumberOfEmployeesValidationResult: PropTypes.object,
    validateMaxNumberOfEmployees: PropTypes.func,
    maxNumberOfEmployeesValidationResult: PropTypes.object,
    validateAddress: PropTypes.func,
    addressValidationResult: PropTypes.object,
    validatePhoneNumber: PropTypes.func,
    phoneNumberValidationResult: PropTypes.object,
    validateFounder: PropTypes.func,
    founderValidationResult: PropTypes.object,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    console.log(state);

    let organizationsSearch = state.organizationsSearch;

    return {
        loadedEconomicActivities: organizationsSearch.economicActivities.payload.data.loadedEconomicActivities,
        selectedEconomicActivitiesOptions: organizationsSearch.economicActivities.payload.data.selectedEconomicActivitiesOptions,
        loadedOrganizationTypes: organizationsSearch.organizationsTypes.payload.data.loadedOrganizationTypes,
        selectedOrganizationTypeOption: organizationsSearch.organizationsTypes.payload.data.selectedOrganizationTypeOption,
        loadedTaxesCommittees: organizationsSearch.taxesCommittees.payload.data.loadedTaxesCommittees,
        selectedTaxesCommitteeOption: organizationsSearch.taxesCommittees.payload.data.selectedTaxesCommitteeOption,
        fullNameValidationResult: organizationsSearch.validation.validationResults.fullNameValidationResult,
        shortNameValidationResult: organizationsSearch.validation.validationResults.shortNameValidationResult,
        addressValidationResult: organizationsSearch.validation.validationResults.addressValidationResult,
        minNumberOfEmployeesValidationResult: organizationsSearch.validation.validationResults.minNumberOfEmployeesValidationResult,
        maxNumberOfEmployeesValidationResult: organizationsSearch.validation.validationResults.maxNumberOfEmployeesValidationResult,
        phoneNumberValidationResult: organizationsSearch.validation.validationResults.phoneNumberValidationResult,
        founderValidationResult: organizationsSearch.validation.validationResults.founderValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        fetchEconomicActivities: (nameContains) => dispatch(loadEconomicActivitiesWithNameContains(nameContains)),
        handleEconomicActivitiesSelect: (options) => dispatch(handleMultipleEconomicActivitiesSelect(options)),
        fetchTaxesCommittees: (nameContains) => dispatch(loadTaxesCommitteesWithNameContains(nameContains)),
        handleTaxesCommitteeSelect: (option) => dispatch(handleTaxesCommitteeSelect(option)),
        fetchOrganizationsTypes: () => dispatch(loadOrganizationsTypes()),
        handleOrganizationTypeSelect: (option) => dispatch(handleOrganizationTypeSelect(option)),
        validateFullName: (fullName, acceptEmpty) => dispatch(validateFullName(fullName, acceptEmpty)),
        validateShortName: (shortName, acceptEmpty) => dispatch(validateShortName(shortName, acceptEmpty)),
        validateMinNumberOfEmployees: (minNumberOfEmployees, acceptEmpty) =>
            dispatch(validateMinNumberOfEmployees(minNumberOfEmployees, acceptEmpty)),
        validateMaxNumberOfEmployees: (maxNumberOfEmployees, acceptEmpty) =>
            dispatch(validateMaxNumberOfEmployees(maxNumberOfEmployees, acceptEmpty)),
        validateAddress: (address, acceptEmpty) => dispatch(validateAddress(address, acceptEmpty)),
        validateFounder: (founder, acceptEmpty) => dispatch(validateFounder(founder, acceptEmpty)),
        validatePhoneNumber: (phoneNumber, acceptEmpty) => dispatch(validatePhoneNumber(phoneNumber, acceptEmpty))
    }
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(OrganizationsSearchForm);