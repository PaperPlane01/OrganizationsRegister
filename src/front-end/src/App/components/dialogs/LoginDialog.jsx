import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {doLogin} from "../../actions/user-actions";
import {Button, TextField} from "material-ui";
import {exceptions} from '../../constants/exception-constants';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog'
import {errorLabelStyle} from "../../styles";
import Typography from "material-ui/es/Typography/Typography";

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
            opened: false
        }
    }

    handleClickOpen = () => {
        this.setState({opened: true});
    };

    handleClickClose = () => {
        this.setState({opened: false});
    };

    handleUsernameChange = (username) => {
        this.setState({username})
    };

    handlePasswordChange = (password) => {
        this.setState({password})
    };

    handleLoginRequest = () => {
        if (this.state.username === '' || this.state.password === '') {
            this.setState({errorMessage: 'Имя пользователя и пароль не могут быть пустыми.'});
            return;
        }

        this.props.doLogin(this.state.username, this.state.password);
    };

    render() {
        const {loginError} = this.props;

        let errorMessage = '';

        if (this.state.errorMessage !== '') {
            errorMessage = this.state.errorMessage;
        }

        if (loginError != undefined) {
            if (loginError.exception === exceptions.NO_MATCH_FOUND_FOR_GIVEN_USERNAME_AND_PASSWORD) {
                errorMessage = 'Неправильные имя пользователя или пароль.';
            } else {
                errorMessage = 'Во время входа в аккаунт произошла ошибка. Пожалуйста, попробуйте позже. '
            }
        }

        return <div>
            <Button variant={'raised'}
                    color={'primary'}
                    onClick={this.handleClickOpen}>
                Войти
            </Button>
            <Dialog open={this.state.opened} onClose={this.handleClickClose}>
                <DialogTitle>Войти</DialogTitle>
                <DialogContent>
                    <TextField id={'usernameInput'}
                           label={'Имя пользователя'}
                           fullWidth={true}
                           onChange={(event) => this.handleUsernameChange(event.target.value)}
                    />
                    <TextField id={'passwordInput'}
                           label={'Пароль'}
                           fullWidth={true}
                           onChange={(event) => this.handlePasswordChange(event.target.value)}
                           type={'password'}
                    />
                    {errorMessage !== ''
                        ? <Typography variant="body1" style={errorLabelStyle}>{errorMessage}</Typography>
                        : ''
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClickClose} variant={'raised'} color={'primary'}>Отмена</Button>
                    <Button onClick={this.handleLoginRequest} variant={'raised'} color={'primary'}>Войти</Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}

LoginDialog.propTypes = {
    doLogin: PropTypes.func,
    loginError: PropTypes.object,
    opened: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        loginError: state.userData.loginError
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (username, password) => dispatch(doLogin(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)