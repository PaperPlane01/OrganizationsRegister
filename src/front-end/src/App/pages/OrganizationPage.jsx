import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from "material-ui/es/Typography/Typography";
import {
    clearOrganizationPageState, fetchBankAccounts, fetchNumberOfYearsSinceRegistration,
    findOrganizationByBin
} from "../actions/organizations-actions";
import {exceptions} from "../constants/exception-constants";
import FinancialStatisticsTable from "../components/tables/FinancialStatisticsTable.jsx";
import {loadFinancialStatistics} from "../actions/financial-statistics-actions";
import BankAccountsTable from "../components/tables/BankAccountsTable.jsx";

class OrganizationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOrganization(this.props.match.params.bin);
        this.props.fetchNumberOfYearsSinceRegistration(this.props.match.params.bin);
        this.props.fetchBankAccounts(this.props.match.params.bin);
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    render() {
        const {organization, numberOfYearsSinceRegistration, error, bankAccounts} = this.props;

        if (error != undefined) {
            if (error.exception === exceptions.ORGANIZATION_NOT_FOUND) {
                return <Typography variant="body1">Организация не была найдена.</Typography>
            } else {
                return <Typography variant="body1">Во время загрузки произошло что-то нехорошее. Но мы уже работаем над этим! Повторите попытку позже.</Typography>
            }
        }

        if (organization == undefined) {
            return <Typography variant="body1">Загрузка...</Typography>
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
    fetchFinancialStatistics: PropTypes.func,
    financialStatistics: PropTypes.array,
    fetchFinancialStatisticsYears: PropTypes.func,
    financialStatisticsYears: PropTypes.array,
    fetchNumberOfYearsSinceRegistration: PropTypes.func,
    numberOfYearsSinceRegistration: PropTypes.number,
    bankAccounts: PropTypes.array,
    fetchBankAccounts: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.object,
    clearState: PropTypes.func
};

const mapStateToProps = (state) => {
    const organizationPage = state.organizationPage;

    return {
        organization: organizationPage.organizationData.organization,
        pending: organizationPage.organizationData.pending,
        numberOfYearsSinceRegistration: organizationPage.organizationData.numberOfYearsSinceRegistration,
        financialStatistics: organizationPage.financialStatistics.searchResults,
        bankAccounts: organizationPage.organizationData.bankAccounts,
        error: organizationPage.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrganization: (bin) => dispatch(findOrganizationByBin(bin)),
        fetchNumberOfYearsSinceRegistration: (bin) => dispatch(fetchNumberOfYearsSinceRegistration(bin)),
        fetchFinancialStatistics: (bin, year, quarter) => dispatch(loadFinancialStatistics(bin, year, quarter)),
        fetchBankAccounts: (bin) => dispatch(fetchBankAccounts(bin)),
        clearState: () => (dispatch(clearOrganizationPageState()))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage);