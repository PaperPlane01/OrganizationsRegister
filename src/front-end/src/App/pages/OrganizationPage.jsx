import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card, { CardContent } from 'material-ui/Card';
import Typography from "material-ui/Typography";
import {
    clearOrganizationPageState, fetchBankAccounts, fetchNumberOfYearsSinceRegistration,
    findOrganizationByBin, initializeOrganizationUpdate
} from "../actions/organizations-actions";
import {exceptions} from "../constants/exception-constants";
import {BankAccountsTable} from "../components/tables";
import {fetchCurrentUser} from "../actions/user-actions";
import OrganizationUpdateDialog from "../components/dialogs/OrganizationUpdateDialog.jsx";
import {
    initializePermittedEconomicActivitiesSelect,
    initializePrimaryEconomicActivitySelect
} from "../actions/economic-activites-actions";
import {initializeOrganizationTypeSelect} from "../actions/organizations-types-actions";
import {initializeTaxesCommitteeSelect} from "../actions/taxes-committees-actions";

class OrganizationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn) {
            this.props.fetchCurrentUser();
        }

        this.props.fetchOrganization(this.props.match.params.bin);
        this.props.fetchNumberOfYearsSinceRegistration(this.props.match.params.bin);
        this.props.fetchBankAccounts(this.props.match.params.bin);
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    handleOrganizationUpdateDialogOpenSelect = () => {
        const organization = this.props.organization;
        this.props.initializeOrganizationUpdate(organization);
    };

    render() {
        const {organization, numberOfYearsSinceRegistration, error, bankAccounts} = this.props;

        let displayOrganizationUpdateDialog = false;

        if (error != undefined) {
            if (error === exceptions.ORGANIZATION_NOT_FOUND) {
                return <Typography variant="body1">Организация не была найдена.</Typography>
            } else {
                return <Typography variant="body1">Во время загрузки произошло что-то нехорошее. Но мы уже работаем над этим! Повторите попытку позже.</Typography>
            }
        }

        if (organization == undefined) {
            return <Typography variant="body1">Загрузка...</Typography>
        }

        if (this.props.userLoggedIn) {
            if (this.props.currentUser != undefined) {
                if (this.props.currentUser.roles.map(role => (role.name)).includes('admin') || organization != undefined) {
                    displayOrganizationUpdateDialog = true;
                }
            }
        }

        return <div>
            <Card style={{marginBottom: '20px'}}>
                <Typography variant="headline" style={{marginLeft: '15px'}}>{organization.fullName}</Typography>
                <CardContent>
                    <Typography variant="body1">БИН: {organization.bin}</Typography>
                    <Typography variant="body1">Полное название: {organization.fullName}</Typography>
                    <Typography variant="body1">
                        Сокращённое название: {organization.shortName == undefined ? '-' : organization.shortName}
                    </Typography>
                    <Typography variant="body1">Налоговый комитет: {organization.taxesCommittee.name}</Typography>
                    <Typography variant="body1">
                        Основая хозяйственная деятельгность: {organization.primaryEconomicActivity.name}
                    </Typography>
                    <Typography variant="body1">
                        Выполняемые хозяйсвенные деятельности:
                        {
                            organization.permittedEconomicActivities.map(economicActivity => (" " + economicActivity.name + ";"))
                        }
                    </Typography>
                    <Typography variant="body1">Форма организации: {organization.organizationType.name}</Typography>
                    <Typography variant="body1">Учредитель: {organization.founder}</Typography>
                    <Typography variant="body1">
                        Дата регистрации: {organization.registrationDate} (лет прошло с даты регистрации: {numberOfYearsSinceRegistration})
                    </Typography>
                    <Typography variant="body1">Количество сотрудников: {organization.numberOfEmployees}</Typography>
                    <Typography variant="body1">Номер телефона: {organization.phoneNumber}</Typography>
                    <Typography variant="body1">Адрес: {organization.address}</Typography>

                    {displayOrganizationUpdateDialog === true
                        ? <OrganizationUpdateDialog
                            onOpen={() => this.handleOrganizationUpdateDialogOpenSelect()}
                        />
                        : ''}
                </CardContent>
            </Card>

            {bankAccounts != undefined
                ? <Card>
                    <Typography variant="headline" style={{marginLeft: '15px'}}>Банковские счета</Typography>
                    <CardContent>
                        <BankAccountsTable dataSource={bankAccounts}/>
                    </CardContent>
                </Card>
                : <Typography variatn="body1">
                    В реестре нет данных о банковских счетах данной организации.
                </Typography>}

        </div>
    }
}

OrganizationPage.propTypes = {
    fetchOrganization: PropTypes.func,
    organization: PropTypes.object,
    fetchNumberOfYearsSinceRegistration: PropTypes.func,
    numberOfYearsSinceRegistration: PropTypes.number,
    bankAccounts: PropTypes.array,
    fetchBankAccounts: PropTypes.func,
    error: PropTypes.object,
    clearState: PropTypes.func,
    userLoggedIn: PropTypes.bool,
    fetchCurrentUser: PropTypes.func,
    currentUser: PropTypes.object,
    initializeOrganizationUpdate: PropTypes.func,
    initializeOrganizationTypeSelect: PropTypes.func,
    initializeTaxesCommitteeSelect: PropTypes.func,
    initializePrimaryEconomicActivitySelect: PropTypes.func,
    initializePermittedEconomicActivitiesSelect: PropTypes.func
};

const mapStateToProps = (state) => {
    const organizationPage = state.organizationPage;
    const {userData} = state;

    return {
        organization: organizationPage.organizationData.organization,
        numberOfYearsSinceRegistration: organizationPage.organizationData.numberOfYearsSinceRegistration,
        bankAccounts: organizationPage.organizationData.bankAccounts,
        error: organizationPage.organizationData.error,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrganization: (bin) => dispatch(findOrganizationByBin(bin)),
        fetchNumberOfYearsSinceRegistration: (bin) => dispatch(fetchNumberOfYearsSinceRegistration(bin)),
        fetchBankAccounts: (bin) => dispatch(fetchBankAccounts(bin)),
        clearState: () => (dispatch(clearOrganizationPageState())),
        fetchCurrentUser: () => dispatch(fetchCurrentUser()),
        initializeOrganizationUpdate: (organization) => dispatch(initializeOrganizationUpdate(organization)),
        initializePermittedEconomicActivitiesSelect: (options) => dispatch(initializePermittedEconomicActivitiesSelect(options)),
        initializePrimaryEconomicActivitySelect: (option) => dispatch(initializePrimaryEconomicActivitySelect(option)),
        initializeOrganizationTypeSelect: (option) => dispatch(initializeOrganizationTypeSelect(option)),
        initializeTaxesCommitteeSelect: (option) => dispatch(initializeTaxesCommitteeSelect(option))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage);