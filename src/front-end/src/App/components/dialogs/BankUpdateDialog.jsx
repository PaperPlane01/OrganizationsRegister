import React from 'react';
import PropTypes from 'prop-types';
import {
    clearBankUpdateDialogState, fetchBankById, updateBank, validateBankAddress,
    validateBankName
} from "../../actions/bank-actions";
import {connect} from 'react-redux';
import ValidationResult from "../../validation/ValidationResult";
import Button from "material-ui/Button";
import Dialog, {DialogTitle, DialogActions, DialogContent} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import {errorLabelStyle, successLabelStyle} from "../../styles/index";
import Input from "material-ui/es/Input/Input";

class BankUpdateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            address: '',
            formValidationResult: new ValidationResult(true, ''),
            isOpened: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialBank != undefined) {
            if (nextProps.initialBank != this.props.initialBank) {
                this.setState({name: nextProps.initialBank.name, address: nextProps.initialBank.address});
                return;
            }
        }
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    handleName = (name) => {
        this.setState({name}, () => this.props.validateName(this.state.name, false));
    };

    handleAddress = (address) => {
        this.setState({address}, () => this.props.validateAddress(this.state.address, false));
    };

    handleOpenRequest = () => {
        this.setState({isOpened: true}, () => this.props.fetchBank(this.props.bankID))
    };

    handleCloseRequest = () => {
        this.setState({isOpened: false}, () => {
            if (this.props.clearStateAfterClosing) {
                this.props.clearState();
            }
        })
    };

    handleUpdateBankRequest = () => {
        const {name, address} = this.state;

        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.updateBank({
                    id: this.props.initialBank.id,
                    name,
                    address
                }).then(updatedBank => {
                    if (this.props.onUpdate != undefined) {
                        this.props.onUpdate(updatedBank);
                    }
                });
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {name, address} = this.state;

        this.props.validateName(name, false);
        this.props.validateAddress(address, false);

        if (this.props.nameValidationResult.isSuccessful() && this.props.addressValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        } else {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')})
        }
    };

    render() {
        const {initialBank, addressValidationResult, nameValidationResult, error, updateSuccess} = this.props;

        let dialogBody = (<Typography variant="body1">Загрузка...</Typography>);

        if (initialBank != undefined) {
            dialogBody = (<div>
                <Typography variant="body1">Название банка (обязательно):</Typography>
                {!nameValidationResult.isSuccessful()
                    ? <Typography variant="body1" style={errorLabelStyle}>{nameValidationResult.getMessage()}</Typography>
                    : ''
                }
                <Input fullWidth={true}
                       placeholder={'Введите название банка'}
                       onChange={(event) => this.handleName(event.target.value)}
                       value={this.state.name}
                />

                <Typography variant="body1">Адрес банка (обязательно):</Typography>
                {!addressValidationResult.isSuccessful()
                    ? <Typography variant="body1" style={errorLabelStyle}>{addressValidationResult.getMessage()}</Typography>
                    : ''}
                <Input fullWidth={true} placeholder={'Введите адрес банка'}
                       onChange={(event) => this.handleAddress(event.target.value)}
                       value={this.state.address}
                />

                {error != undefined
                    ? <Typography variant="body1" style={errorLabelStyle}>
                        Во время попытки обновить банк произошла ошкибка. Сервер ответил со статусом {error.status}. Попробуйте позже.
                    </Typography> :
                    ''}
                {updateSuccess === true
                    ? <Typography variant="body1" style={successLabelStyle}>
                        Банк успешно обновлён!
                    </Typography>
                    : ''}
            </div>)
        }

        return <div>
            <Button onClick={() => this.handleOpenRequest()}
                    variant={'raised'}
                    color={'primary'}>Редактировать
            </Button>

            <Dialog open={this.state.isOpened}>
                <DialogTitle>
                    Редактировать банк
                </DialogTitle>
                <DialogContent>
                    {dialogBody}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleCloseRequest()}
                            variant={'raised'}
                            color={'primary'}>
                        Закрыть
                    </Button>
                    {initialBank != undefined
                        ? <Button onClick={() => this.handleUpdateBankRequest()}
                                  variant={'raised'}
                                  color={'primary'}>
                            Обновить
                        </Button>
                        : ''}
                </DialogActions>
            </Dialog>
        </div>
    }
};

BankUpdateDialog.propTypes = {
    bankID: PropTypes.number,
    fetchBank: PropTypes.func,
    initialBank: PropTypes.object,
    updatedBank: PropTypes.object,
    validateName: PropTypes.func,
    nameValidationResult: PropTypes.object,
    validateAddress: PropTypes.func,
    addressValidationResult: PropTypes.object,
    updateBank: PropTypes.func,
    error: PropTypes.object,
    onUpdate: PropTypes.func,
    updateSuccess: PropTypes.bool,
    clearState: PropTypes.func,
    clearStateAfterClosing: PropTypes.bool
};

const mapStateToProps = (state) => {
    const {bankUpdate} = state;

    return {
        initialBank: bankUpdate.bankUpdateInfo.initialBank,
        updatedBank: bankUpdate.bankUpdateInfo.updatedBank,
        error: bankUpdate.bankUpdateInfo.error,
        nameValidationResult: bankUpdate.validation.nameValidationResult,
        addressValidationResult: bankUpdate.validation.addressValidationResult,
        updateSuccess: bankUpdate.bankUpdateInfo.updateSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateAddress: (address, acceptEmpty) => dispatch(validateBankAddress(address, acceptEmpty)),
        validateName: (name, acceptEmpty) => dispatch(validateBankName(name, acceptEmpty)),
        fetchBank: (id) => dispatch(fetchBankById(id)),
        updateBank: (bank) => dispatch(updateBank(bank)),
        clearState: () => dispatch(clearBankUpdateDialogState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankUpdateDialog);