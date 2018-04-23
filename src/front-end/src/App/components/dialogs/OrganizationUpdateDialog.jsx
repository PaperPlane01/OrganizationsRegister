import React from 'react';
import PropTypes from 'prop-types';
import ValidationResult from "../../validation/ValidationResult";
import {connect} from 'react-redux';
import {fetchEconomicActivitiesByName} from "../../actions/economic-activites-actions";
import {fetchOrganizationTypes} from "../../actions/organizations-types-actions";
import {fetchTaxesCommitteesByName} from "../../actions/taxes-committees-actions";
import {
    updateOrganization, updateOrganizationAddress, updateOrganizationFounder, updateOrganizationFullName,
    updateOrganizationNumberOfEmployees, updateOrganizationOrganizationType,
    updateOrganizationPermittedEconomicActivities,
    updateOrganizationPhoneNumber, updateOrganizationPrimaryEconomicActivity, updateOrganizationRegistrationDate,
    updateOrganizationShortName, updateOrganizationTaxesCommittee,
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
import {exceptions} from '../../constants/exception-constants';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import {successLabelStyle} from "../../styles/index";

const styles = theme => formStyle(theme);

class OrganizationUpdateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            formValidationResult: new ValidationResult(true, ''),
        }
    }

    handleOpenRequest = () => {
        this.setState({isOpened: true}, () => {
            this.props.onOpen();
            if (this.props.fetchedOrganizationTypes == undefined) {
                this.props.fetchOrganizationTypes();
            }
        });
    };

    handleCloseRequest = () => {
        this.setState({isOpened: false});
    };

    handleFullName = (fullName) => {
        this.props.updateFullName(fullName);
        this.props.validateFullName(this.props.organization.fullName, false);
    };

    handleShortName = (shortName) => {
        this.props.updateShortName(shortName);
        this.props.validateShortName(this.props.organization.shortName, true);
    };

    handleNumberOfEmployees = (numberOfEmployees) => {
        this.props.updateNumberOfEmployees(numberOfEmployees);
        this.props.validateNumberOfEmployees(this.props.organization.numberOfEmployees, false);
    };

    handlePhoneNumber = (phoneNumber) => {
        this.props.updatePhoneNumber(phoneNumber);
        this.props.validatePhoneNumber(this.props.organization.phoneNumber, false);
    };

    handleAddress = (address) => {
        this.props.updateAddress(address);
        this.props.validateAddress(this.props.organization.address, false);
    };

    handleFounder = (founder) => {
        this.props.updateFounder(founder);
        this.props.validateFounder(this.props.organization.founder, false);
    };

    handleRegistrationDate = (registrationDate) => {
        this.props.updateRegistrationDate(registrationDate);
    };

    handlePrimaryEconomicActivitySelect = (option) => {
        option == undefined
            ? this.props.updatePrimaryEconomicActivity(null)
            : this.props.updatePrimaryEconomicActivity(option.value)
    };

    handlePermittedEconomicActivitiesSelect = (options) => {
        if (options == undefined || options.length === 0) {
            this.props.updatePermittedEconomicActivities(null);
        } else  {
            this.props.updatePermittedEconomicActivities(options.map(option => (option.value)))
        }
    };

    handleTaxesCommitteeSelect = (option) => {
        option == undefined
            ? this.props.updateTaxesCommittee(null)
            : this.props.updateTaxesCommittee(option.value)
    };

    handleOrganizationTypeSelect = (option) => {
        option == undefined
            ? this.props.updateOrganizationType(null)
            : this.props.updateOrganizationType(option.value)
    };

    handleOrganizationUpdateRequest = () => {
        this.validateAllFields().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.handleUpdateOrganizationRequest(this.props.organization);
            }
        })
    };

    async validateAllFields() {
        const {validateAddress, validatePhoneNumber, validateNumberOfEmployees, validateFullName,
            validateShortName, validateFounder} = this.props;
        const {fullNameValidationResult, shortNameValidationResult,
            numberOfEmployeesValidationResult, phoneNumberValidationResult, founderValidationResult} = this.props;
        const {address, phoneNumber, numberOfEmployees, fullName, shortName, registrationDate, founder,
            primaryEconomicActivity, permittedEconomciActivities, taxesCommittee, organizationType} = this.props.organization;

        validateAddress(address, false);
        validatePhoneNumber(phoneNumber, false);
        validateFounder(founder, false);
        validateNumberOfEmployees(numberOfEmployees, false);
        validateFullName(fullName, false);
        validateShortName(shortName, true);

        if (!fullNameValidationResult.successful
            || !shortNameValidationResult.successful || !numberOfEmployeesValidationResult.successful ||
            !phoneNumberValidationResult.successful || !founderValidationResult.successful) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля не заполнены или заполнены' +
                ' некорректно.')});
            return;
        }

        if (taxesCommittee == undefined
            || primaryEconomicActivity == undefined
            || organizationType == undefined
            || registrationDate == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые обязательные поля не заполнены')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')});
    };

    render() {
        const {classes, fetchedEconomicActivitiesForPrimaryEconomicActivitySelect,
            fetchEconomicActivitiesForPermittedEconomicActivitiesSelect, fetchEconomicActivitiesForPrimaryEconomicActivitySelect,
            fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect,
            fetchedOrganizationTypes,
            fetchTaxesCommittees, fetchedTaxesCommittees, organization} = this.props;

        const selectedOrganizationTypeOption = (organization == undefined || organization.organizationType == undefined)
            ? null
            : {label: organization.organizationType.name, value: organization.organizationType};
        const selectedTaxesCommitteeOption = (organization == undefined || organization.taxesCommittee == undefined)
            ? null
            : {label: organization.taxesCommittee.name, value: organization.taxesCommittee};
        const selectedPrimaryEconomicActivityOption = (organization == undefined
            || organization.primaryEconomicActivity == undefined)
            ? null
            : {label: organization.primaryEconomicActivity.name, value: organization.primaryEconomicActivity};
        const selectedPermittedEconomicActivitiesOptions = (organization == undefined ||
        organization.permittedEconomicActivities == undefined)
            ? null
            : organization.permittedEconomicActivities.map(economicActivity => ({label: economicActivity.name,
                value: economicActivity}));

        let fullName = null;
        let shortName = null;
        let address = null;
        let founder = null;
        let phoneNumber = null;
        let registrationDate = null;
        let numberOfEmployees = null;

        if (organization != undefined) {
            fullName = organization.fullName;
            shortName = organization.shortName;
            address = organization.address;
            phoneNumber = organization.phoneNumber;
            registrationDate = organization.registrationDate;
            numberOfEmployees = organization.numberOfEmployees;
            founder = organization.founder;
        }

        return <div>
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleOpenRequest()}>
                Редактировать
            </Button>
            <div>
                <Dialog open={this.state.isOpened}>
                    <DialogTitle>
                        Редактировать организацию
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">Полное название организации (обязательно):</Typography>
                        {!this.props.fullNameValidationResult.isSuccessful()
                            ? <Typography variant="body1" style={errorLabelStyle}>
                                {this.props.fullNameValidationResult.getMessage()}
                            </Typography>
                            : ''}
                        <Input placeholder={'Введите полное название организации'}
                               value={fullName}
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
                               value={shortName}
                               onChange={(event) => this.handleShortName(event.target.value)}
                               fullWidth={true}
                        />

                        <Typography variant="body1">Тип организации (обязательно):</Typography>
                        <OrganizationTypeSelect organizationTypes={fetchedOrganizationTypes}
                                                selectedOption={selectedOrganizationTypeOption}
                                                onSelect={(option) => this.handleOrganizationTypeSelect(option)}
                                                classes={classes}
                        />

                        <Typography variant="body1">Основная хозяйственная деятельность (обязательно):</Typography>
                        <EconomicActivitySelect economicActivities={fetchedEconomicActivitiesForPrimaryEconomicActivitySelect}
                                                onInput={(nameContains) =>
                                                    fetchEconomicActivitiesForPrimaryEconomicActivitySelect(nameContains)}
                                                multipleSelectEnabled={false}
                                                onSelect={(option) => this.handlePrimaryEconomicActivitySelect(option)}
                                                selectedOptions={selectedPrimaryEconomicActivityOption}
                                                classes={classes}
                        />

                        <Typography variant="body1">Разрешённые хозяйственные деятельности:</Typography>
                        <EconomicActivitySelect economicActivities={fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect}
                                                onInput={(nameContains) =>
                                                    fetchEconomicActivitiesForPermittedEconomicActivitiesSelect(nameContains)}
                                                multipleSelectEnabled={true}
                                                onSelect={(options) => this.handlePermittedEconomicActivitiesSelect(options)}
                                                selectedOptions={selectedPermittedEconomicActivitiesOptions}
                                                classes={classes}
                        />

                        <Typography variant="body1">Налоговый комитет (обязательно):</Typography>
                        <TaxesCommitteeSelect taxesCommittees={fetchedTaxesCommittees}
                                              onInput={(nameContains) => fetchTaxesCommittees(nameContains)}
                                              onSelect={(option) => this.handleTaxesCommitteeSelect(option)}
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
                               value={numberOfEmployees}
                               onInput={(event) => this.handleNumberOfEmployees(event.target.value)}
                               fullWidth={true}
                        />

                        <Typography variant="body1">Дата регистрации (обязательно):</Typography>
                        <DatePicker label={'Выберите дату регистрации'}
                                    clearable
                                    disableFuture
                                    maxDateMessage={'Дата должна быть не больше сегодняшней.'}
                                    value={registrationDate}
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
                               value={founder}
                               onChange={event => this.handleFounder(event.target.value)}
                               fullWidth={true}/>

                        <Typography variant="body1">Телефонный номер (обязательно):</Typography>
                        {!this.props.phoneNumberValidationResult.isSuccessful() ?
                            <Typography variant="body1" style={errorLabelStyle}>
                                {this.props.phoneNumberValidationResult.getMessage()}
                            </Typography> : ''}
                        <Input placeholder={'Введите телефонный номер организации'}
                               value={phoneNumber}
                               onChange={event => this.handlePhoneNumber(event.target.value)}
                               fullWidth={true}/>

                        <Typography variant="body1">Адрес (обязательно):</Typography>
                        {!this.props.addressValidationResult.isSuccessful() ?
                            <Typography variant="body1" style={errorLabelStyle}>
                                {this.props.addressValidationResult.getMessage()}
                            </Typography> : ''}
                        <Input placeholder={'Введите адрес организации'}
                               value={address}
                               onChange={event => this.handleAddress(event.target.value)}
                               fullWidth={true}/>
                        {!this.state.formValidationResult.isSuccessful() ?
                            <Typography variant="body1" style={errorLabelStyle}>
                                {this.state.formValidationResult.getMessage()}
                            </Typography> : ''}
                        {this.props.updatedOrganization != undefined
                            ? <Typography variant="body1" style={successLabelStyle}>
                                'Организация успешно обвновлена!'
                            </Typography>
                            : ''}
                        {this.props.error != undefined
                            ? <Typography variant="body1" style={errorLabelStyle}>
                                Во время обновления прозошла ошибка. Попробуйте позже.
                            </Typography>
                            : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleCloseRequest()}
                                variant={'raised'}
                                color={'primary'}>
                            Закрыть
                        </Button>
                        <Button onClick={() => this.handleOrganizationUpdateRequest()}
                                variant={'raised'}
                                color={'primary'}>
                            Обновить организацию
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    }
}

OrganizationUpdateDialog.propTypes = {
    organization: PropTypes.object,
    error: PropTypes.string,
    handleUpdateOrganizationRequest: PropTypes.func,
    updatedOrganization: PropTypes.object,
    fetchedEconomicActivitiesForPrimaryEconomicActivitySelect: PropTypes.array,
    fetchEconomicActivitiesForPrimaryEconomicActivitySelect: PropTypes.func,
    fetchedEconomicActivitiesForPermittedEconomicActivitiesSelect: PropTypes.array,
    fetchEconomicActivitiesForPermittedEconomicActivitiesSelect: PropTypes.func,
    fetchedTaxesCommittees: PropTypes.array,
    fetchTaxesCommittees: PropTypes.func,
    fetchedOrganizationTypes: PropTypes.array,
    fetchOrganizationTypes: PropTypes.func,
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
    onSuccessfulUpdate: PropTypes.func,
    onOpen: PropTypes.func.isRequired,
    updateFullName: PropTypes.func,
    updateShortName: PropTypes.func,
    updateAddress: PropTypes.func,
    updateNumberOfEmployees: PropTypes.func,
    updateFounder: PropTypes.func,
    updatePhoneNumber: PropTypes.func,
    updatePrimaryEconomicActivity: PropTypes.func,
    updatePermittedEconomicActivities: PropTypes.func,
    updateTaxesCommittee: PropTypes.func,
    updateOrganizationType: PropTypes.func,
    updateRegistrationDate: PropTypes.func,
};

const mapStateToProps = (state) => {

    console.log(state);
    const {organizationUpdate} = state;
    const {primaryEconomicActivitySelect, permittedEconomicActivitiesSelect,
        taxesCommitteeSelect, organizationTypeSelect} = organizationUpdate;
    const {validationResults} = organizationUpdate.validation;

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
        founderValidationResult: validationResults.founderValidationResult,
        organization: organizationUpdate.organizationUpdateInformation.organization,
        updatedOrganization: organizationUpdate.organizationUpdateInformation.updatedOrganization
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleUpdateOrganizationRequest: (organization) => dispatch(updateOrganization(organization)),
        fetchEconomicActivitiesForPrimaryEconomicActivitySelect:
            (nameContains) => dispatch(fetchEconomicActivitiesByName(nameContains)),
        fetchEconomicActivitiesForPermittedEconomicActivitiesSelect:
            (nameContains) => dispatch(fetchEconomicActivitiesByName(nameContains)),
        fetchOrganizationTypes: () => dispatch(fetchOrganizationTypes()),
        updateAddress: (address) => dispatch(updateOrganizationAddress(address)),
        updateFullName: (fullName) => dispatch(updateOrganizationFullName(fullName)),
        updateShortName: (shortName) => dispatch(updateOrganizationShortName(shortName)),
        updateFounder: (founder) => dispatch(updateOrganizationFounder(founder)),
        updatePhoneNumber: (phoneNumber) => dispatch(updateOrganizationPhoneNumber(phoneNumber)),
        updateNumberOfEmployees: (numberOfEmployees) => dispatch(updateOrganizationNumberOfEmployees(numberOfEmployees)),
        updateOrganizationType: (organizationType) => dispatch(updateOrganizationOrganizationType(organizationType)),
        updateTaxesCommittee: (taxesCommittee) => dispatch(updateOrganizationTaxesCommittee(taxesCommittee)),
        updatePrimaryEconomicActivity: (primaryEconomicActivity) => dispatch(updateOrganizationPrimaryEconomicActivity(primaryEconomicActivity)),
        updatePermittedEconomicActivities: (permittedEconomicActivities) => dispatch(updateOrganizationPermittedEconomicActivities(permittedEconomicActivities)),
        updateRegistrationDate: (registrationDate) => dispatch(updateOrganizationRegistrationDate(registrationDate)),
        fetchTaxesCommittees: (nameContains) => dispatch(fetchTaxesCommitteesByName(nameContains)),
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
)(OrganizationUpdateDialog);