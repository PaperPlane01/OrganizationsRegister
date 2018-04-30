import 'babel-polyfill';
import React from 'react';
import {connect} from 'react-redux';
import {Input, withStyles} from 'material-ui';
import PropTypes from 'prop-types';
import ValidationResult from '../../validation/ValidationResult';
import Button from 'material-ui/Button';
import { DatePicker } from 'material-ui-pickers';
import {
    fetchEconomicActivitiesByName,
    handleEconomicActivitiesSelect,
} from "../../actions/economic-activites-actions";
import {
    fetchTaxesCommitteesByName, handleTaxesCommitteeSelect,
} from "../../actions/taxes-committees-actions";
import {
    fetchOrganizationTypes, handleOrganizationTypeSelect,
} from "../../actions/organizations-types-actions";
import {validateAddress, validateFounder,
    validateFullName, validateMaxNumberOfEmployees, validateMinNumberOfEmployees, validatePhoneNumber, validateShortName
} from "../../actions/organizations-actions";
import compose from 'recompose/compose';
import {errorLabelStyle, formStyle} from "../../styles/";
import Typography from "material-ui/es/Typography/Typography";
import {Link} from "react-router-dom";
import {OrganizationTypeSelect, TaxesCommitteeSelect, EconomicActivitySelect} from "../selects/";

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

        const {addressValidationResult, fullNameValidationResult, shortNameValidationResult,
        phoneNumberValidationResult, founderValidationResult, minNumberOfEmployeesValidationResult,
        maxNumberOfEmployeesValidationResult} = this.props;

        let overallValidationResult = new ValidationResult(true, '');

        if (!addressValidationResult.isSuccessful() || !fullNameValidationResult.isSuccessful()
            || !shortNameValidationResult.isSuccessful() || !phoneNumberValidationResult.isSuccessful()
            || !founderValidationResult.isSuccessful() || !minNumberOfEmployeesValidationResult.isSuccessful()
            || !maxNumberOfEmployeesValidationResult.isSuccessful()) {
            overallValidationResult = new ValidationResult(false, 'Некоторые поля заполнены неверно.');
        }

        this.setState({overallValidationResult});
    };

    render() {
        const {classes, fetchedEconomicActivities, handleEconomicActivitiesSelect, selectedEconomicActivitiesOptions,
            fetchEconomicActivities, fetchedTaxesCommittees, handleTaxesCommitteeSelect, selectedTaxesCommitteeOption,
            fetchTaxesCommittees, fetchedOrganizationTypes, selectedOrganizationTypeOption, handleOrganizationTypeSelect
        } = this.props;

        return <div>
            <Typography variant="headline">Поиск организаций</Typography>
            <Typography variant="body1">Полное название организации:</Typography>
            {!this.props.fullNameValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.fullNameValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите полное название органиации'}
                   onChange={event => this.handleOrganizationFullName(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Сокращённое название организации:</Typography>
            {!this.props.shortNameValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.shortNameValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите сокращённое название организации'}
                   onChange={event => this.handleOrganizationShortName(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Тип организации:</Typography>
            <OrganizationTypeSelect organizationTypes={fetchedOrganizationTypes}
                                    selectedOption={selectedOrganizationTypeOption}
                                    onSelect={option => handleOrganizationTypeSelect(option)}
                                    classes={classes}/><br/>

            <Typography variant="body1">Выполняемые хозяйственные деятельности:</Typography>
            <EconomicActivitySelect economicActivities={fetchedEconomicActivities}
                                    selectedOptions={selectedEconomicActivitiesOptions}
                                    onSelect={option => handleEconomicActivitiesSelect(option)}
                                    onInput={nameContains => fetchEconomicActivities(nameContains)}
                                    classes={classes}
                                    multipleSelectEnabled={true}/><br/>

            <Typography variant="body1">Налоговый комитет:</Typography>
            <TaxesCommitteeSelect taxesCommittees={fetchedTaxesCommittees}
                                  selectedOption={selectedTaxesCommitteeOption}
                                  onSelect={option => handleTaxesCommitteeSelect(option)}
                                  onInput={nameContains => fetchTaxesCommittees(nameContains)}
                                  classes={classes}/>

            <Typography variant="body1">Минимальное количество сотрудников:</Typography>
            {!this.props.minNumberOfEmployeesValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.minNumberOfEmployeesValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите минимальное количество содтрудников'}
                   onChange={event => this.handleMinNumberOfEmployees(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Максимальное количетсво сотрудников:</Typography>
            {!this.props.maxNumberOfEmployeesValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.maxNumberOfEmployeesValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите максимальное количество сотрудников'}
                   onChange={event => this.handleMaxNumberOfEmployees(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Минимальная дата регистрации:</Typography>
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

            <Typography variant="body1">Максимальная дата регистрации:</Typography>
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

            <Typography variant="body1">Учредитель:</Typography>
            {!this.props.founderValidationResult.isSuccessful() ?
                <Typography variant="body1" color={'red'}>
                    {this.props.founderValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите учредителя организации'}
                   onChange={event => this.handleFounder(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Телефонный номер:</Typography>
            {!this.props.phoneNumberValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.phoneNumberValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите телефонный номер организации'}
                   onChange={event => this.handlePhoneNumber(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Адрес:</Typography>
            {!this.props.addressValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.addressValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите адрес организации'}
                   onChange={event => this.handleAddress(event.target.value)}
                   fullWidth={true}/><br/>

            <Link to={"#searchResults"} style={{'text-decoration': 'none'}}>
                <Button variant={'raised'} color={'primary'} onClick={() => this.handleSearchRequest()}>Поиск</Button>
            </Link>
            {!this.state.overallValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.state.overallValidationResult.getMessage()}
                </Typography> : ''}
        </div>
    }
}

OrganizationsSearchForm.propTypes = {
    fetchedEconomicActivities: PropTypes.array,
    selectedEconomicActivitiesOptions: PropTypes.array,
    fetchedTaxesCommittees: PropTypes.array,
    selectedTaxesCommitteeOption: PropTypes.object,
    fetchedOrganizationTypes: PropTypes.array,
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

    const organizationsSearch = state.organizationsSearch;

    const {economicActivitiesSelect, taxesCommitteeSelect, organizationTypeSelect} = organizationsSearch;
    const {validationResults} = organizationsSearch.validation;

    return {
        fetchedEconomicActivities: economicActivitiesSelect.data.dataSource,
        selectedEconomicActivitiesOptions: economicActivitiesSelect.data.selectedOptions,
        fetchedOrganizationTypes: organizationTypeSelect.data.dataSource,
        selectedOrganizationTypeOption: organizationTypeSelect.data.selectedOption,
        fetchedTaxesCommittees: taxesCommitteeSelect.data.dataSource,
        selectedTaxesCommitteeOption: taxesCommitteeSelect.data.selectedOption,
        fullNameValidationResult: validationResults.fullNameValidationResult,
        shortNameValidationResult: validationResults.shortNameValidationResult,
        addressValidationResult: validationResults.addressValidationResult,
        minNumberOfEmployeesValidationResult: validationResults.minNumberOfEmployeesValidationResult,
        maxNumberOfEmployeesValidationResult: validationResults.maxNumberOfEmployeesValidationResult,
        phoneNumberValidationResult: validationResults.phoneNumberValidationResult,
        founderValidationResult: validationResults.founderValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        fetchEconomicActivities: (nameContains) => dispatch(fetchEconomicActivitiesByName(nameContains)),
        handleEconomicActivitiesSelect: (options) => dispatch(handleEconomicActivitiesSelect(options)),
        fetchTaxesCommittees: (nameContains) => dispatch(fetchTaxesCommitteesByName(nameContains)),
        handleTaxesCommitteeSelect: (option) => dispatch(handleTaxesCommitteeSelect(option)),
        fetchOrganizationsTypes: () => dispatch(fetchOrganizationTypes()),
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