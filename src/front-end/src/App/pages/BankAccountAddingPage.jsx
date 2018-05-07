import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BankAccountAddingForm} from "../components/forms";
import Typography from "material-ui/es/Typography/Typography";
import {errorLabelStyle, successLabelStyle} from "../styles";
import {addBankAccount} from "../actions/bank-accounts-actions";
import {fetchCurrentUser} from "../actions/user-actions";

class BankAccountAddingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.userLoggedIn && this.props.currentUser == undefined) {
            this.props.fetchCurrentUser();
        }
    }

    handleAddBankAccountRequest = (bankAccount) => {
        this.props.addBankAccount(bankAccount);
    };

    render() {
        const {userLoggedIn, currentUser, addedBankAccount, error} = this.props;

        if (!userLoggedIn) {
            return <div>
                <Typography variant="headline">Войдите в аккаунт, чтобы получить доступ к этой странице.</Typography>
            </div>
        }

        if (currentUser == undefined) {
            return <div>
                <Typography variant="body1">Загрузка...</Typography>
            </div>
        }

        return <div>
            <BankAccountAddingForm onFormSubmitted={(bankAccount) => this.handleAddBankAccountRequest(bankAccount)}/>
            {error != undefined
                ? <Typography variant="body1" style={errorLabelStyle}>
                    Во время попытки добавить банковский счёт произошла ошибка. Сервер ответил со статусом {error.status}. Пожалуйста, попробуйте позже.
                </Typography>
                : ''}
            {error == undefined && addedBankAccount != undefined
                ? <Typography variant="body1" style={successLabelStyle}>
                    Банковский счёт успешно добавлен!
                </Typography>
                : ''}
        </div>
    }
}

BankAccountAddingPage.propTypes = {
    userLoggedIn: PropTypes.bool,
    currentUser: PropTypes.object,
    addedBankAccount: PropTypes.object,
    error: PropTypes.object,
    addBankAccount: PropTypes.func
};

const mapStateToProps = (state) => {
    const {userData, bankAccountAddingPage} = state;
    const {addedBankAccount, error} = bankAccountAddingPage.bankAccountAddingInfo;
    const {loggedIn, currentUser} = userData;
    console.log(state);
    console.log(addedBankAccount);

    return {
        userLoggedIn: loggedIn,
        currentUser: currentUser,
        error: error,
        addedBankAccount: addedBankAccount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addBankAccount: (bankAccount) => dispatch(addBankAccount(bankAccount)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountAddingPage);