import React from 'react';
import PropTypes from 'prop-types';
import ValidationResult from "../../validation/ValidationResult";
import {connect} from 'react-redux';
import {errorLabelStyle} from "../../styles/";
import {Input} from 'material-ui';
import Typography from "material-ui/es/Typography/Typography";
import Button from "material-ui/es/Button/Button";
import {validateOrganizationTypeName} from "../../actions/organizations-types-actions";

class OrganizationTypesSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            formValidationResult: new ValidationResult(true, '')
        }
    }

    handleName = (name) => {
        this.setState({name}, () => this.props.validateName(this.state.name, true));
    };

    handleSearchRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                this.props.onFormSubmitted({name: this.state.name});
            }
        })
    };

    async assertAllFieldsAreValid() {
        this.props.validateName(this.state.name, true);

        if (!this.props.nameValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')});
    }

    render() {
        return <div>
            <Typography variant='body1'>
                Название типа предприятия
            </Typography>
            {!this.props.nameValidationResult.isSuccessful()
                ? <Typography variant='body1' style={errorLabelStyle}>
                    {this.props.nameValidationResult.getMessage()}
                    </Typography>
                : ''}
                <Input placeholder={'Введите название типа предприятия'}
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
};

OrganizationTypesSearchForm.propTypes = {
    onFormSubmitted: PropTypes.func,
    validateName: PropTypes.func,
    nameValidationResult: PropTypes.object
};

const mapStateToProps = (state) => {
    console.log(state);

    const {validation} = state.organizationTypesSearchPage;

    return {
        nameValidationResult: validation.nameValidationResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        validateName: (name, acceptEmpty) => dispatch(validateOrganizationTypeName(name, acceptEmpty))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTypesSearchForm);