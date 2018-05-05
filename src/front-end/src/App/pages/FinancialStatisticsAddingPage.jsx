import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FinancialStatisticsAddingForm} from '../components/forms';
import Typography from "material-ui/es/Typography/Typography";
import {errorLabelStyle, successLabelStyle} from "../styles";
import {fetchCurrentUser} from "../actions/user-actions";
import {addFinancialStatistics} from "../actions/financial-statistics-actions";

class FinancialStatisticsAddingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {userLoggedIn, currentUser, fetchCurrentUser, error, addedFinancialStatistics, addFinancialStatistics}
        = this.props;

        if (!userLoggedIn) {return <Typography variant="headline">
            Войдите в аккаунт, чтобы получить доступ к этой странице.
        </Typography>
        } else if (currentUser == undefined) {
            fetchCurrentUser();
            return <Typography variant="body1">
                Загрузка...
            </Typography>
        }

        if (!currentUser.roles.map(role => (role.name)).includes('admin')) {
            return <Typography variant="headline">
                У вас нет прав доступа к этой странице.
            </Typography>
        } else {
            return <div>
                <FinancialStatisticsAddingForm
                    onFormSubmitted={(financialStatistics) => addFinancialStatistics(financialStatistics)}
                />

                {error != undefined
                    ? <Typography variant="body1" style={errorLabelStyle}>
                        Во время добавления финансовой статистики произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позже.
                    </Typography>
                    : ''}

                {addedFinancialStatistics != undefined
                    ? <Typography variant="body1" style={successLabelStyle}>
                        Финансовые показатели успешно добавлены!
                    </Typography>
                    : ''}
            </div>
        }
    }
};

FinancialStatisticsAddingPage.propTypes = {
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func,
    addFinancialStatistics: PropTypes.func,
    addedFinancialStatistics: PropTypes.object,
    error: PropTypes.object,
};

const mapStateToProps = (state) => {
    const {userData, financialStatisticsAdding} = state;
    const {financialStatisticsAddingInfo} = financialStatisticsAdding;

    return {
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser,
        addedFinancialStatistics: financialStatisticsAddingInfo.addedFinancialStatistics,
        error: financialStatisticsAddingInfo.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser()),
        addFinancialStatistics: (financialStatistics) => dispatch(addFinancialStatistics(financialStatistics))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialStatisticsAddingPage);