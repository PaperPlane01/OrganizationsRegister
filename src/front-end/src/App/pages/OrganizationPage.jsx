import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from "material-ui/es/Typography/Typography";
import {fetchNumberOfYearsSinceRegistration, findOrganizationByBin} from "../actions/organizations-actions";
import {exceptions} from "../constants/exception-constants";

class OrganizationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchOrganization(this.props.match.params.bin);
        this.props.fetchNumberOfYearsSinceRegistration(this.props.match.params.bin);
    }

    render() {
        const {organization, numberOfYearsSinceRegistration, error} = this.props;

        console.log(organization);

        if (organization == undefined) {
            return <Typography variant="body1">Загрузка...</Typography>
        }

        if (error != undefined) {
            if (error.exception === exceptions.ORGANIZATION_NOT_FOUND) {
                return <Typography variant="body1">Организация не была найдена.</Typography>
            } else {
                return <Typography variant="body1">Во время загрузки произошло что-то нехорошее. Но мы уже работаем над этим! Повторите попытку позже.</Typography>
            }
        }

        return <div>
            <Card>
                <Typography variant="headline">{organization.fullName}</Typography>
                <CardContent>
                    <Typography variant="body1">БИН: {organization.bin}</Typography>
                    <Typography variant="body1">Полное название: {organization.fullName}</Typography>
                    <Typography variant="body1">
                        Сокращённое название: {organization.shortName == '' ? '-' : organization.shortName}
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
    numberOfYearsSinceRegistration: PropTypes.func,
    error: PropTypes.object
};

const mapStateToProps = (state) => {
    const organizationPage = state.organizationPage;

    return {
        organization: organizationPage.organizationData.organization,
        numberOfYearsSinceRegistration: organizationPage.organizationData.numberOfYearsSinceRegistration,
        error: organizationPage.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrganization: (bin) => dispatch(findOrganizationByBin(bin)),
        fetchNumberOfYearsSinceRegistration: (bin) => dispatch(fetchNumberOfYearsSinceRegistration(bin))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage);