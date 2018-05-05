import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ValidationResult from "../../validation/ValidationResult";
import Button from "material-ui/es/Button/Button";
import Dialog from "material-ui/es/Dialog/Dialog";
import DialogTitle from "material-ui/es/Dialog/DialogTitle";
import DialogActions from "material-ui/es/Dialog/DialogActions";
import DialogContent from "material-ui/es/Dialog/DialogContent";
import Typography from "material-ui/es/Typography/Typography";
import {errorLabelStyle, successLabelStyle} from "../../styles/index";
import Input from "material-ui/es/Input/Input";
import {
    clearTaxesCommitteeUpdateDialog, clearTaxesCommitteeValidationState,
    fetchTaxesCommitteeById, updateTaxesCommittee,
    validateTaxesCommitteeName, validateTaxesCommitteeAddress
} from "../../actions/taxes-committees-actions";

class TaxesCommitteeUpdateDialog extends React.Component {
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
        if (nextProps.initialTaxesCommittee != undefined) {
            if (nextProps.initialTaxesCommittee != this.props.initialTaxesCommittee) {
                this.setState({name: nextProps.initialTaxesCommittee.name, address: nextProps.initialTaxesCommittee.address});
                return;
            }
        }

        if (nextProps.updatedTaxesCommittee != undefined) {
            if (this.props.onUpdate != undefined) {
                this.props.onUpdate(nextProps.updateTaxesCommittee);
            }
        }
    }

    componentWillUnmount() {
        this.props.clearState();
        this.props.clearValidation();
    };

    handleName = (name) => {
        this.setState({name}, () => this.props.validateName(this.state.name, false));
    };

    handleAddress = (address) => {
        this.setState({address}, () => this.props.validateAddress(this.state.address, false));
    };

    handleOpenRequest = () => {
        this.setState({isOpened: true}, () => this.props.fetchTaxesCommittee(this.props.taxesCommitteeId))
    };

    handleCloseRequest = () => {
        this.setState({isOpened: false})
    };

    handleUpdateTaxesCommitteeRequest = () => {
        const {name, address} = this.state;

        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.updateTaxesCommittee({
                    id: this.props.initialTaxesCommittee.id,
                    name,
                    address
                })
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
        const {initialTaxesCommittee, addressValidationResult, nameValidationResult,
            error, updateSuccess} = this.props;

        let dialogBody = (<Typography variant="body1">Загрузка...</Typography>);

        if (initialTaxesCommittee != undefined) {
            dialogBody = (<div>
                <Typography variant="body1">Название налогового комитета (обязательно):</Typography>
                {!nameValidationResult.isSuccessful()
                    ? <Typography variant="body1" style={errorLabelStyle}>{nameValidationResult.getMessage()}</Typography>
                    : ''
                }
                <Input fullWidth={true}
                       placeholder={'Введите название налогового комитета'}
                       onChange={(event) => this.handleName(event.target.value)}
                       value={this.state.name}
                />

                <Typography variant="body1">Адрес налогового комитета (обязательно):</Typography>
                {!addressValidationResult.isSuccessful()
                    ? <Typography variant="body1" style={errorLabelStyle}>{addressValidationResult.getMessage()}</Typography>
                    : ''}
                <Input fullWidth={true} placeholder={'Введите адрес налогового комитета'}
                       onChange={(event) => this.handleAddress(event.target.value)}
                       value={this.state.address}
                />

                {error != undefined
                    ? <Typography variant="body1" style={errorLabelStyle}>
                        Во время попытки обновить налоговый комитета произошла ошкибка.
                        Сервер ответил со статусом {error.status}. Попробуйте позже.
                    </Typography> :
                    ''}
                {updateSuccess === true
                    ? <Typography variant="body1" style={successLabelStyle}>
                        Налоговый комитета успешно обновлён!
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
                    Редактировать Налоговый комитет
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
                    {initialTaxesCommittee != undefined
                        ? <Button onClick={() => this.handleUpdateTaxesCommitteeRequest()}
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

TaxesCommitteeUpdateDialog.propTypes = {
    taxesCommitteeId: PropTypes.number,
    fetchTaxesCommittee: PropTypes.func,
    initialTaxesCommittee: PropTypes.object,
    updatedTaxesCommittee: PropTypes.object,
    updateTaxesCommittee: PropTypes.func,
    nameValidationResult: PropTypes.object,
    validateName: PropTypes.func,
    addressValidationResult: PropTypes.object,
    validateAddress: PropTypes.func,
    updateSuccess: PropTypes.bool,
    clearState: PropTypes.func,
    error: PropTypes.object,
    clearValidation: PropTypes.func,
    onUpdate: PropTypes.func
};

const mapStateToProps = (state) => {
    const {taxesCommitteeUpdate} = state;
    const {taxesCommitteeUpdateInfo, validation} = taxesCommitteeUpdate;

    return {
        initialTaxesCommittee: taxesCommitteeUpdateInfo.initialTaxesCommittee,
        updatedTaxesCommittee: taxesCommitteeUpdateInfo.updatedTaxesCommittee,
        updateSuccess: taxesCommitteeUpdateInfo.updateSuccess,
        error: taxesCommitteeUpdateInfo.error,
        nameValidationResult: validation.nameValidationResult,
        addressValidationResult: validation.addressValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTaxesCommittee: (id) => dispatch(fetchTaxesCommitteeById(id)),
        updateTaxesCommittee: (taxesCommittee) => dispatch(updateTaxesCommittee(taxesCommittee)),
        validateName: (name, acceptEmpty) => dispatch(validateTaxesCommitteeName(name, acceptEmpty)),
        validateAddress: (address, acceptEmpty) => dispatch(validateTaxesCommitteeAddress(address, acceptEmpty)),
        clearState: () => dispatch(clearTaxesCommitteeUpdateDialog()),
        clearValidation: () => dispatch(clearTaxesCommitteeValidationState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaxesCommitteeUpdateDialog);