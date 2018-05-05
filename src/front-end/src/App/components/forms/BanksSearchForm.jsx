import React from 'react';
import PropTypes from 'prop-types';
import ValidationResult from "../../validation/ValidationResult";
import {connect} from 'react-redux';
import {errorLabelStyle} from "../../styles/";
import {Input} from 'material-ui';
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";
import {validateBankAddress, validateBankName} from "../../actions/bank-actions";

class BanksSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            address: null,
            formValidationResult: new ValidationResult(true, '')
        }
    }

    handleName = (name) => {
        this.setState({name: name}, () => {
            this.props.validateAddress(this.state.name, true)
        })
    };

    handleAddress = (address) => {
        this.setState({address: address}, () => {
            this.props.validateAddress(this.state.address, true)
        })
    };

    handleSearchRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.onFormSubmitted({name: this.state.name, address: this.state.address});
            }
        })
    };

    async assertAllFieldsAreValid() {
        this.props.validateName(this.state.name, true);
        this.props.validateAddress(this.state.address, true);

        if (!this.props.nameValidationResult.isSuccessful() || !this.props.addressValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')})
        } else {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        }
    }

    render() {
        const {nameValidationResult, addressValidationResult} = this.props;
        return <div>
            <Typography variant="headline">Поиск банков</Typography>
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

            {!this.state.formValidationResult.isSuccessful()
                ? <Typography variant="body1">
                    {this.state.formValidationResult.getMessage()}
                </Typography>
                : ''
            }
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleSearchRequest()}>
                Поиск
            </Button>
        </div>
    }
}

BanksSearchForm.propTypes = {
    validateName: PropTypes.func,
    validateAddress: PropTypes.func,
    nameValidationResult: PropTypes.object,
    addressValidationResult: PropTypes.object,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    const {banksSearchPage} = state;
    const {validation} = banksSearchPage;

    return {
        nameValidationResult: validation.nameValidationResult,
        addressValidationResult: validation.addressValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateName: (name, acceptEmpty) => dispatch(validateBankName(name, acceptEmpty)),
        validateAddress: (address, acceptEmpty) => dispatch(validateBankAddress(address, acceptEmpty))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BanksSearchForm);