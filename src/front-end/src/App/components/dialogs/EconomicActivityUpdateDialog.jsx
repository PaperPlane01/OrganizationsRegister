import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ValidationResult from "../../validation/ValidationResult";
import Button from "material-ui/Button";
import Dialog, {DialogTitle, DialogActions, DialogContent} from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import {errorLabelStyle, successLabelStyle} from "../../styles/index";
import Input from "material-ui/Input";
import equals from "fast-deep-equal";
import {
    clearEconomicActivityUpdateDialogState,
    clearEconomicActivityValidationState,
    fetchEconomicActivityById, updateEconomicActivity,
    validateEconomicActivityName
} from "../../actions/economic-activites-actions";

class EconomicActivityUpdateDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            name: '',
            formValidationResult: new ValidationResult(true, '')
        }
    }

    componentWillUnmount() {
        this.props.clearValidationState();
        this.props.clearDialogState();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initialEconomicActivity != undefined && !equals(this.props.initialEconomicActivity,
                nextProps.initialEconomicActivity)) {
            this.setState({name: nextProps.initialEconomicActivity.name});
        }
    }

    handleName = (name) => {
        this.setState({name}, () => this.props.validateName(this.state.name, false));
    };

    handleOpenRequest = () => {
        this.setState({isOpened: true}, () => {
            if (this.props.initialEconomicActivity == undefined) {
                this.props.fetchEconomicActivity(this.props.economicActivityID);
            }
        });
    };

    handleCloseRequest = () => {
        this.setState({isOpened: false}, () => {
            if (this.props.clearStateAfterClosing) {
                this.clearState()
            }
        });
    };

    clearState = () => {
        this.props.clearDialogState();
        this.props.clearValidationState();
    };

    handleUpdateRequest = () => {
        const {name} = this.state;
        const {economicActivityID} = this.props;
        const id = economicActivityID;

        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.updateEconomicActivity({id, name}).then(updatedEconomicActivity => {
                    if (this.props.onUpdate != undefined) {
                        this.props.onUpdate(updatedEconomicActivity);
                    }
                });
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {validateName, nameValidationResult} = this.props;
        const {name} = this.state;

        validateName(name, false);

        if (!nameValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
        } else {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        }
    }

    render() {
        const {initialEconomicActivity, nameValidationResult,
            error, updateSuccess} = this.props;

        let dialogBody = (<Typography variant="body1">Загрузка...</Typography>);

        if (initialEconomicActivity != undefined) {
            dialogBody = (<div>
                <Typography variant="body1">Название хозяйственной деятельности (обязательно):</Typography>
                {!nameValidationResult.isSuccessful()
                    ? <Typography variant="body1" style={errorLabelStyle}>{nameValidationResult.getMessage()}</Typography>
                    : ''
                }
                <Input fullWidth={true}
                       placeholder={'Введите название хозяйственной деятельности'}
                       onChange={(event) => this.handleName(event.target.value)}
                       value={this.state.name}
                />

                {error != undefined
                    ? <Typography variant="body1" style={errorLabelStyle}>
                        Во время попытки обновить хозяйственную деятельность произошла ошкибка.
                        Сервер ответил со статусом {error.status}. Попробуйте позже.
                    </Typography> :
                    ''}
                {updateSuccess === true
                    ? <Typography variant="body1" style={successLabelStyle}>
                        Хозяйственная деятельность успешно обновлёна!
                    </Typography>
                    : ''}
            </div>)
        }

        return <div>
            <Button onClick={() => this.handleOpenRequest()}
                    variant={'raised'}
                    color={'primary'}>
                Редактировать
            </Button>

            <Dialog open={this.state.isOpened}>
                <DialogTitle>
                    Редактировать хозяйственную деятельность
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
                    {initialEconomicActivity != undefined
                        ? <Button onClick={() => this.handleUpdateRequest()}
                                  variant={'raised'}
                                  color={'primary'}>
                            Обновить
                        </Button>
                        : ''}
                </DialogActions>
            </Dialog>
        </div>
    }
}

EconomicActivityUpdateDialog.propTypes = {
    economicActivityID: PropTypes.number,
    fetchEconomicActivity: PropTypes.func,
    initialEconomicActivity: PropTypes.object,
    updatedEconomicActivity: PropTypes.object,
    updateEconomicActivity: PropTypes.func,
    validateName: PropTypes.func,
    nameValidationResult: PropTypes.object,
    error: PropTypes.object,
    onUpdate: PropTypes.func,
    updateSuccess: PropTypes.bool,
    clearStateAfterClosing: PropTypes.bool,
    clearDialogState: PropTypes.func,
    clearValidationState: PropTypes.func
};

const mapStateToProps = (state) => {
    const {economicActivityUpdate} = state;
    const {economicActivityUpdateInfo, validation} = economicActivityUpdate;

    return {
        initialEconomicActivity: economicActivityUpdateInfo.initialEconomicActivity,
        updatedEconomicActivity: economicActivityUpdateInfo.updatedEconomicActivity,
        error: economicActivityUpdateInfo.error,
        updateSuccess: economicActivityUpdateInfo.updateSuccess,
        nameValidationResult: validation.validationResults.nameValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEconomicActivity: (id) => dispatch(fetchEconomicActivityById(id)),
        updateEconomicActivity: (economicActivity) => dispatch(updateEconomicActivity(economicActivity)),
        validateName: (name, acceptEmpty) => dispatch(validateEconomicActivityName(name, acceptEmpty)),
        clearValidationState: () => dispatch(clearEconomicActivityValidationState()),
        clearDialogState: () => dispatch(clearEconomicActivityUpdateDialogState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EconomicActivityUpdateDialog);