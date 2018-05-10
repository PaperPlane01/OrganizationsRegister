import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FinancialAccountAddingForm} from "../components/forms";
import Typography from "material-ui/Typography";
import Card, {CardContent} from "material-ui/Card";
import {addFinancialAccount} from "../actions/financial-accounts-actions";
import {errorLabelStyle, successLabelStyle} from "../styles/index";
import {fetchCurrentUser} from "../actions/user-actions";

class FinancialAccountAddingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn && this.props.currentUser == undefined) {
            this.props.fetchCurrentUser();
        }
    }

    render() {
        const {userLoggedIn, currentUser, addFinancialAccount, addedFinancialAccount, error} = this.props;

        if (!userLoggedIn) {
            return <Typography variant="headline">Войдите в аккаунт, чтобы получить доступ к этой странице.</Typography>
        }

        if (currentUser == undefined) {
            return <Typography variant="headline">Загрузка...</Typography>
        }

        if (currentUser.roles.map(role => (role.name)).includes('admin')) {
            return <div>
                <FinancialAccountAddingForm onFormSubmitted={(financialAccount) => addFinancialAccount(financialAccount)}/>

                {addedFinancialAccount != undefined
                    ? <Typography variant="body1" style={successLabelStyle}>
                        Бухгалтерский счёт успешно добавлен!
                    </Typography>
                    : ''}

                {error != undefined
                    ? <Typography variant="body1" style={errorLabelStyle}>
                        Во время добавления бухгалтерского счёта произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позже.
                    </Typography>
                    : ''}
            </div>
        }
    }
};

FinancialAccountAddingPage.propTypes = {
    error: PropTypes.object,
    addedFinancialAccount: PropTypes.object,
    addFinancialAccount: PropTypes.func,
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    fetchCurrentUser: PropTypes.func
};

const mapStateToProps = (state) => {
    const {financialAccountAddingPage, userData} = state;
    const {financialAccountAddingInfo} = financialAccountAddingPage;

    return {
        error: financialAccountAddingInfo.error,
        addFinancialAccount: financialAccountAddingInfo.addedFinancialAccount,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFinancialAccount: (financialAccount) => dispatch(addFinancialAccount(financialAccount)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialAccountAddingPage);