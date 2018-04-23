import {validateEconomicActivityName} from "../../actions/economic-activites-actions";

import React from 'react';
import PropTypes from 'prop-types';
import ValidationResult from "../../validation/ValidationResult";
import {connect} from 'react-redux';
import {errorLabelStyle} from "../../styles/";
import {Input} from 'material-ui';
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";

class EconomicActivitiesSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            formValidationResult: new ValidationResult(true, '')
        }
    }

    handleName = (name) => {
        this.setState({name}, () => this.props.validateName(this.state.name));
    };

    handleSearchRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.onFormSubmitted({name: this.state.name})
            }
        })
    };

    async assertAllFieldsAreValid() {
        this.props.validateName(this.state.name);

        if (!this.props.nameValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно')});
        }  else {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        }
    }

    render() {
        return <div>
            <Typography variant='headline'>Поиск хозяственных деятельностей</Typography>

            <Typography variant='body1'>Название хозяйственной деятельности:</Typography>
            {!this.props.nameValidationResult.isSuccessful()
                ? <Typography variant='body1' style={errorLabelStyle}>
                    {this.props.nameValidationResult.getMessage()}
                </Typography>
                : ''}
            <Input placeholder={'Введите название хозяйственной деятельности'}
                   onChange={(event) => this.handleName(event.target.value)}
                   fullWidth={true}
            />

            {!this.state.formValidationResult.isSuccessful()
                ? <Typography variant='body1' style={errorLabelStyle}>
                    {this.state.formValidationResult.getMessage()}
                </Typography>
                : ''}
            <Button color={'primary'}
                    variant={'raised'}
                    onClick={() => this.handleSearchRequest()}>
                Поиск
            </Button>
        </div>
    }
}

EconomicActivitiesSearchForm.propTypes = {
    onFormSubmitted: PropTypes.func.isRequired,
    validateName: PropTypes.func,
    nameValidationResult: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);
    const {economicActivitiesSearchPage} = state;
    const {nameValidationResult} = economicActivitiesSearchPage.validation.validationResults;

    return {
        nameValidationResult: nameValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateName: (name, acceptEmpty) => dispatch(validateEconomicActivityName(name, acceptEmpty))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EconomicActivitiesSearchForm);