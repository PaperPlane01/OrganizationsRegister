import React from 'react';
import PropTypes from 'prop-types';
import ValidationResult from "../../validation/ValidationResult";
import {connect} from 'react-redux';
import {errorLabelStyle} from "../../styles/";
import {Input, Button, Typography} from 'material-ui';
import {validateFinancialAccountName} from "../../actions/financial-accounts-actions";

class FinancialAccountAddingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            formValidationResult: new ValidationResult(true, '')
        }
    }

    handleName = (name) => {
        this.setState({name}, this.props.validateName(this.state.name, false));
    };

    handleAddingRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                const {name} = this.state;
                this.props.onFormSubmitted({name});
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {nameValidationResult, validateName} = this.props;
        const {name} = this.state;

        validateName(name, false);

        if (!nameValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
        } else {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        }
    }

    render() {
        const {nameValidationResult} = this.props;
        const {formValidationResult} = this.state;

        return <div>
            <Typography variant="headline">Добавление бухгалтерского счёта</Typography>

            <Typography variant="body1">Название бухгалтерского счёта:</Typography>
            {!nameValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {nameValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input fullWidth={true}
                   placeholder={'Введите название бухгалтерского счёта'}
                   onChange={(event) => this.handleName(event.target.value)}
            />

            {!formValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>
                    {formValidationResult.getMessage()}
                </Typography>
                : ''}
            <Button variant={'raised'} color={'primary'} onClick={() => this.handleAddingRequest()}>
                Добавить
            </Button>
        </div>
    }
}

FinancialAccountAddingForm.propTypes = {
    nameValidationResult: PropTypes.object,
    validateName: PropTypes.func,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    const {validation} = state.financialAccountAddingPage;

    return {
        nameValidationResult: validation.nameValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateName: (name, acceptEmpty) => dispatch(validateFinancialAccountName(name, acceptEmpty))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinancialAccountAddingForm);