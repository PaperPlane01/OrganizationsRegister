import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BankAddingForm} from "../components/forms";
import {fetchCurrentUser} from "../actions/user-actions";
import {addBank, clearBankAddingPageState} from "../actions/bank-actions";
import Typography from "material-ui/Typography";
import {errorLabelStyle, successLabelStyle} from "../styles/index";
import Link from "react-router-dom/es/Link";

class BankAddingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    render() {
        const {addedBank, handleAddBankRequest, fetchCurrentUser, currentUser, error, userLoggedIn} = this.props;

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
                <BankAddingForm onFormSubmitted={(bank) => handleAddBankRequest(bank)}/>

                {error != undefined
                    ? <Typography variant="body1" style={errorLabelStyle}>
                        Во время добавления банка произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позже.
                    </Typography>
                    : ''}

                {addedBank != undefined
                    ?<div> <Typography variant="body1" style={successLabelStyle}>
                        Банк успешно добавлен!
                    </Typography> <Link to={'/organizations-register/banks/'.concat(addedBank.id)}>Ссылка</Link></div>
                    : ''}
            </div>
        }
    }
};

BankAddingPage.propTypes = {
    addedBank: PropTypes.object,
    handleAddBankRequest: PropTypes.func,
    error: PropTypes.object,
    currentUser: PropTypes.object,
    userLoggedIn: PropTypes.bool,
    fetchCurrentUser: PropTypes.func,
    clearState: PropTypes.func
};

const mapStateToProps = (state) => {
    const {bankAddingPage, userData} = state;

    return {
        addedBank: bankAddingPage.bankAddingInfo.addedBank,
        error: bankAddingPage.bankAddingInfo.error,
        userLoggedIn: userData.loggedIn,
        currentUser: userData.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser()),
        handleAddBankRequest: (bank) => dispatch(addBank(bank)),
        clearState: () => dispatch(clearBankAddingPageState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAddingPage);