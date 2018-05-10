import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {validateBankAddress, validateBankName} from "../../actions/bank-actions";
import ValidationResult from "../../validation/ValidationResult";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import {errorLabelStyle} from "../../styles/index";
import Input from "material-ui/Input";

class BankAddingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValidationResult: new ValidationResult(true, ''),
            name: '',
            address: ''
        }
    }

    handleName = (name) => {
        this.setState({name}, () => this.props.validateName(this.state.name, false));
    };

    handleAddress = (address) => {
        this.setState({address}, () => this.props.validateAddress(this.state.address, false));
    };

    handleSaveBankRequest = () => {
        const {formValidationResult, name, address} = this.state;

        this.assertAllFieldsAreValid().then(() => {
            if (formValidationResult.isSuccessful()) {
                this.props.onFormSubmitted({name, address});
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {name, address} = this.state;
        const {validateName, validateAddress, nameValidationResult, addressValidationResult} = this.props;

        validateName(name, false);
        validateAddress(address, false);

        if (!nameValidationResult.isSuccessful() || !addressValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
        } else {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        }
    }

    render() {
        const {nameValidationResult, addressValidationResult} = this.props;
        const {formValidationResult} = this.state;

        return <div>
            <Typography variant="headline">Добавить банк:</Typography>
            <Typography variant="body1">Название банка:</Typography>
            {!nameValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {nameValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input placeholder={'Введите название банка'}
                   onChange={(event) => this.handleName(event.target.value)}
                   fullWidth={true}
            />

            <Typography variant="body1">Адрес банка:</Typography>
            {!addressValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {addressValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input placeholder={'Введите адрес банка'}
                   onChange={(event) => this.handleAddress(event.target.value)}
                   fullWidth={true}
            />

            {!formValidationResult.isSuccessful()
                ? <Typography variant="body1">
                    {formValidationResult.getMessage()}
                </Typography>
                : ''
            }
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleSaveBankRequest()}>
                Сохранить
            </Button>
        </div>
    }
};

BankAddingForm.propTypes = {
    nameValidationResult: PropTypes.object,
    validateName: PropTypes.func,
    addressValidationResult: PropTypes.object,
    validateAddress: PropTypes.func,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    console.log(state);
    const {bankAddingPage} = state;

    return {
        nameValidationResult: bankAddingPage.validation.nameValidationResult,
        addressValidationResult: bankAddingPage.validation.addressValidationResult,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateName: (name, acceptEmpty) => dispatch(validateBankName(name, acceptEmpty)),
        validateAddress: (address, acceptEmpty) => dispatch(validateBankAddress(address, acceptEmpty)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BankAddingForm);

