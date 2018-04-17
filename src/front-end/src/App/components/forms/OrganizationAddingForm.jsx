import React from 'react';
import PropTypes from 'prop-types';
import ValidationResult from "../../validation/ValidationResult";
import {connect} from 'react-redux';
import {
    fetchEconomicActivitiesByName, handleEconomicActivitiesSelect,
    handlePermittedEconomicActivitiesSelect, handlePrimaryEconomicActivitySelect
} from "../../actions/economic-activites-actions";
import {fetchOrganizationTypes, handleOrganizationTypeSelect} from "../../actions/organizations-types-actions";
import {fetchTaxesCommitteesByName, handleTaxesCommitteeSelect} from "../../actions/taxes-committees-actions";
import {
    validateAddress, validateBin, validateFounder, validateFullName, validateNumberOfEmployees, validatePhoneNumber,
    validateShortName
} from "../../actions/organizations-actions";
import compose from 'recompose/compose';
import {errorLabelStyle, formStyle} from "../../styles/";
import {Input, withStyles} from 'material-ui';
import OrganizationTypeSelect from '../selects/OrganizationTypeSelect.jsx';
import EconomicActivitySelect from '../selects/EconomicActivitySelect.jsx';
import TaxesCommitteeSelect from '../selects/TaxesCommitteeSelect.jsx';
import Typography from "material-ui/es/Typography/Typography";
import {DatePicker} from "material-ui-pickers";
import Button from "material-ui/es/Button/Button";

const styles = theme => formStyle(theme);

class OrganizationAddingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bin: null,
            fullName: null,
            shortName: null,
            numberOfEmployees: null,
            registrationDate: null,
            phoneNumber: null,
            address: null,
            founder: null,
            formValidationResult: new ValidationResult(true, '')
        }
    }

    componentDidMount() {
        this.props.fetchOrganizationTypes();
    }

    handleBin = (bin) => {
        this.setState({bin: bin}, () => {
            this.props.validateBin(this.state.bin, false);
        })
    };

    handleFullName = (fullName) => {
        this.setState({fullName: fullName}, () => {
            this.props.validateFullName(this.state.fullName, false);
        })
    };

    handleShortName = (shortName) => {
        this.setState({shortName: shortName}, () => {
            this.props.validateShortName(this.state.shortName, true);
        })
    };

    handleNumberOfEmployees = (numberOfEmployees) => {
        this.setState({numberOfEmployees: numberOfEmployees}, () => {
            this.props.validateNumberOfEmployees(this.state.numberOfEmployees, false);
            console.log(this.props.numberOfEmployeesValidationResult);
        })
    };

    handlePhoneNumber = (phoneNumber) => {
        this.setState({phoneNumber: phoneNumber}, () => {
            this.props.validatePhoneNumber(this.state.phoneNumber, false)
        })
    };

    handleAddress = (address) => {
        this.setState({address: address}, () => {
            this.props.validateAddress(this.state.address, false);
        })
    };

    handleFounder = (founder) => {
        this.setState({founder: founder}, () => {
            this.props.validateFounder(this.state.founder, false);
        })
    };

    handleRegistrationDate = (date) => {
        this.setState({registrationDate: date});
    };

    handleAddOrganizationRequest = () => {
        this.validateAllFields().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                const organization = {
                    bin: this.state.bin,
                    fullName: this.state.fullName,
                    shortName: this.state.shortName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    founder: this.state.founder,
                    registrationDate: this.state.registrationDate,
                    primaryEconomicActivity: this.props.selectedPrimaryEconomicActivityOption.value,
                    permittedEconomicActivities: this.props.selectedPermittedEconomicActivitiesOptions != undefined
                        ? this.props.selectedPermittedEconomicActivitiesOptions.map(option => (option.value))
                        : null,
                    taxesCommittee: this.props.selectedTaxesCommitteeOption.value,
                    organizationType: this.props.selectedOrganizationTypeOption.value
                };

                this.props.onFormSubmitted(organization);
            }
        })
    };

    async validateAllFields() {
        const {validateBin, validateAddress, validatePhoneNumber, validateNumberOfEmployees, validateFullName,
            validateShortName, validateFounder} = this.props;
        const {binValidationResult, fullNameValidationResult, shortNameValidationResult,
            numberOfEmployeesValidationResult, phoneNumberValidationResult, founderValidationResult} = this.props;
        const {bin, address, phoneNumber, numberOfEmployees, fullName, shortName, registrationDate, founder} = this.state;

        validateBin(bin, false);
        validateAddress(address, false);
        validatePhoneNumber(phoneNumber, false);
        validateFounder(founder, false);
        validateNumberOfEmployees(numberOfEmployees, false);
        validateFullName(fullName, false);
        validateShortName(shortName, false);

        if (!binValidationResult.successful || !fullNameValidationResult.successful
            || !shortNameValidationResult.successful || !numberOfEmployeesValidationResult.successful ||
            !phoneNumberValidationResult.successful || !founderValidationResult.successful) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля не заполнены или заполнены' +
                ' некорректно.')});
            return;
        }

        if (this.props.selectedTaxesCommitteeOption == undefined
            || this.props.selectedPrimaryEconomicActivityOption == undefined
            || this.props.selectedOrganizationTypeOption == undefined
            || registrationDate == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые обязательные поля не заполнены')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')});
    };

    render() {
        const {classes, fetchedEconomicActivitiesForPrimaryEconomicActivitySelect,
            handlePrimaryEconomicActivitySelect, selectedPrimaryEconomicActivityOption,
            fetchEconomicActivitiesForPermittedEconomicActivitiesSelect, fetchEconomicActivitiesForPrimaryEconomicActivitySelect,
            fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect, handlePermittedEconomicActivitiesSelect,
            selectedPermittedEconomicActivitiesOptions, fetchedOrganizationTypes, handleOrganizationTypeSelect,
            selectedOrganizationTypeOption, fetchTaxesCommittees, fetchedTaxesCommittees, handleTaxesCommitteeSelect,
            selectedTaxesCommitteeOption} = this.props;

        return <div>
            <Typography variant="headline">Добавление организации</Typography>

            <Typography variant="body1">БИН организации (обязательно):</Typography>
            {!this.props.binValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.binValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input placeholder={'Введите БИН организации'}
                   onChange={(event) => this.handleBin(event.target.value)}
                   fullWidth={true}
            />

            <Typography variant="body1">Полное название организации (обязательно):</Typography>
            {!this.props.fullNameValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.fullNameValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input placeholder={'Введите полное название организации'}
                   onChange={(event) => this.handleFullName(event.target.value)}
                   fullWidth={true}
            />

            <Typography variant="body1">Сокращённое название организации:</Typography>
            {!this.props.shortNameValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.shortNameValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input placeholder={'Введите сокращённое название организации'}
                   onChange={(event) => this.handleShortName(event.target.value)}
                   fullWidth={true}
            />

            <Typography variant="body1">Тип организации (обязательно):</Typography>
            <OrganizationTypeSelect organizationTypes={fetchedOrganizationTypes}
                                    selectedOption={selectedOrganizationTypeOption}
                                    onSelect={(option) => handleOrganizationTypeSelect(option)}
                                    classes={classes}
            />

            <Typography variant="body1">Основная хозяйственная деятельность (обязательно):</Typography>
            <EconomicActivitySelect economicActivities={fetchedEconomicActivitiesForPrimaryEconomicActivitySelect}
                                    onInput={(nameContains) =>
                                        fetchEconomicActivitiesForPrimaryEconomicActivitySelect(nameContains)}
                                    multipleSelectEnabled={false}
                                    onSelect={(option) => handlePrimaryEconomicActivitySelect(option)}
                                    selectedOptions={selectedPrimaryEconomicActivityOption}
                                    classes={classes}
            />

            <Typography variant="body1">Разрешённые хозяйственные деятельности:</Typography>
            <EconomicActivitySelect economicActivities={fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect}
                                    onInput={(nameContains) =>
                                        fetchEconomicActivitiesForPermittedEconomicActivitiesSelect(nameContains)}
                                    multipleSelectEnabled={true}
                                    onSelect={(options) => handlePermittedEconomicActivitiesSelect(options)}
                                    selectedOptions={selectedPermittedEconomicActivitiesOptions}
                                    classes={classes}
            />

            <Typography variant="body1">Налоговый комитет (обязательно):</Typography>
            <TaxesCommitteeSelect taxesCommittees={fetchedTaxesCommittees}
                                  onInput={(nameContains) => fetchTaxesCommittees(nameContains)}
                                  onSelect={(option) => handleTaxesCommitteeSelect(option)}
                                  selectedOption={selectedTaxesCommitteeOption}
                                  classes={classes}
            />

            <Typography variant="body1">Количество сотрудников (обязательно):</Typography>
            {!this.props.numberOfEmployeesValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.numberOfEmployeesValidationResult.getMessage()}
                </Typography>
                : ''
            }
            <Input placeholder={'Введите количество сотрудников'}
                   onInput={(event) => this.handleNumberOfEmployees(event.target.value)}
                   fullWidth={true}
            />

            <Typography variant="body1">Дата регистрации (обязательно):</Typography>
            <DatePicker label={'Выберите дату регистрации'}
                        clearable
                        disableFuture
                        maxDateMessage={'Дата должна быть не больше сегодняшней.'}
                        value={this.state.registrationDate}
                        onChange={date => this.handleRegistrationDate(date)}
                        fullWidth={true}
                        format={'D MMM YYYY'}
                        cancelLabel={'Отменить'}
                        clearLabel={'Очистить'}
            />

            <Typography variant="body1">Учредитель (обязательно):</Typography>
            {!this.props.founderValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.founderValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите учредителя организации'}
                   onChange={event => this.handleFounder(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Телефонный номер (обязательно):</Typography>
            {!this.props.phoneNumberValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.phoneNumberValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите телефонный номер организации'}
                   onChange={event => this.handlePhoneNumber(event.target.value)}
                   fullWidth={true}/>

            <Typography variant="body1">Адрес (обязательно):</Typography>
            {!this.props.addressValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.props.addressValidationResult.getMessage()}
                </Typography> : ''}
            <Input placeholder={'Введите адрес организации'}
                   onChange={event => this.handleAddress(event.target.value)}
                   fullWidth={true}/>

            <Button variant={'raised'} color={'primary'} onClick={() => this.handleAddOrganizationRequest()}>
                Добавить организацию
            </Button>

            {!this.state.formValidationResult.isSuccessful() ?
                <Typography variant="body1" style={errorLabelStyle}>
                    {this.state.formValidationResult.getMessage()}
                </Typography> : ''}
        </div>
    }
}

OrganizationAddingForm.propTypes = {
    fetchedEconomicActivitiesForPrimaryEconomicActivitySelect: PropTypes.array,
    fetchEconomicActivitiesForPrimaryEconomicActivitySelect: PropTypes.func,
    fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect: PropTypes.array,
    fetchEconomicActivitiesForPermittedEconomicActivitiesSelect: PropTypes.func,
    selectedPrimaryEconomicActivityOption: PropTypes.object,
    selectedPermittedEconomicActivitiesOptions: PropTypes.array,
    handlePrimaryEconomicActivitySelect: PropTypes.func,
    handlePermittedEconomicActivitiesSelect: PropTypes.func,
    fetchedTaxesCommittees: PropTypes.array,
    fetchTaxesCommittees: PropTypes.func,
    selectedTaxesCommitteeOption: PropTypes.object,
    handleTaxesCommitteeSelect: PropTypes.func,
    fetchedOrganizationTypes: PropTypes.array,
    fetchOrganizationTypes: PropTypes.func,
    selectedOrganizationTypeOption: PropTypes.object,
    handleOrganizationTypeSelect: PropTypes.func,
    validateBin: PropTypes.func,
    binValidationResult: PropTypes.object,
    validateFullName: PropTypes.func,
    fullNameValidationResult: PropTypes.object,
    validateShortName: PropTypes.func,
    shortNameValidationResult: PropTypes.object,
    validateFounder: PropTypes.func,
    founderValidationResult: PropTypes.object,
    validatePhoneNumber: PropTypes.func,
    phoneNumberValidationResult: PropTypes.object,
    validateAddress: PropTypes.func,
    addressValidationResult: PropTypes.object,
    validateNumberOfEmployees: PropTypes.func,
    numberOfEmployeesValidationResult: PropTypes.object,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    const organizationAdding = state.organizationAdding;

    const {primaryEconomicActivitySelect, permittedEconomicActivitiesSelect, taxesCommitteeSelect,
    organizationTypeSelect} = organizationAdding;

    const {validationResults} = organizationAdding.validation;

    return {
        fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect: permittedEconomicActivitiesSelect.data.dataSource,
        selectedPermittedEconomicActivitiesOptions: permittedEconomicActivitiesSelect.data.selectedOptions,
        fetchedEconomicActivitiesForPrimaryEconomicActivitySelect: primaryEconomicActivitySelect.data.dataSource,
        selectedPrimaryEconomicActivityOption: primaryEconomicActivitySelect.data.selectedOption,
        fetchedTaxesCommittees: taxesCommitteeSelect.data.dataSource,
        selectedTaxesCommitteeOption: taxesCommitteeSelect.data.selectedOption,
        fetchedOrganizationTypes: organizationTypeSelect.data.dataSource,
        selectedOrganizationTypeOption: organizationTypeSelect.data.selectedOption,
        binValidationResult: validationResults.binValidationResult,
        fullNameValidationResult: validationResults.fullNameValidationResult,
        shortNameValidationResult: validationResults.shortNameValidationResult,
        numberOfEmployeesValidationResult: validationResults.numberOfEmployeesValidationResult,
        addressValidationResult: validationResults.addressValidationResult,
        phoneNumberValidationResult: validationResults.phoneNumberValidationResult,
        founderValidationResult: validationResults.founderValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEconomicActivitiesForPrimaryEconomicActivitySelect:
            (nameContains) => dispatch(fetchEconomicActivitiesByName(nameContains)),
        fetchEconomicActivitiesForPermittedEconomicActivitiesSelect:
            (nameContains) => dispatch(fetchEconomicActivitiesByName(nameContains)),
        handlePermittedEconomicActivitiesSelect: (options) => dispatch(handlePermittedEconomicActivitiesSelect(options)),
        handlePrimaryEconomicActivitySelect: (option) => dispatch(handlePrimaryEconomicActivitySelect(option)),
        fetchOrganizationTypes: () => dispatch(fetchOrganizationTypes()),
        handleOrganizationTypeSelect: (option) => dispatch(handleOrganizationTypeSelect(option)),
        fetchTaxesCommittees: (nameContains) => dispatch(fetchTaxesCommitteesByName(nameContains)),
        handleTaxesCommitteeSelect: (option) => dispatch(handleTaxesCommitteeSelect(option)),
        validateBin: (bin, acceptEmpty) => dispatch(validateBin(bin, acceptEmpty)),
        validateFullName: (fullName, acceptEmpty) => dispatch(validateFullName(fullName, acceptEmpty)),
        validateShortName: (shortName, acceptEmpty) => dispatch(validateShortName(shortName, acceptEmpty)),
        validateAddress: (address, acceptEmpty) => dispatch(validateAddress(address, acceptEmpty)),
        validatePhoneNumber: (phoneNumber, acceptEmpty) => dispatch(validatePhoneNumber(phoneNumber, acceptEmpty)),
        validateFounder: (phoneNumber, acceptEmpty) => dispatch(validateFounder(phoneNumber, acceptEmpty)),
        validateNumberOfEmployees: (numberOfEmployees, acceptEmpty) => dispatch(validateNumberOfEmployees(numberOfEmployees, acceptEmpty))
    }
};


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(OrganizationAddingForm);