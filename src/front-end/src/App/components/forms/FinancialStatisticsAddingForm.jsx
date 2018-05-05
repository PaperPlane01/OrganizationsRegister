import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {OrganizationSelect, AttributeSelect, QuarterSelect, FinancialAccountSelect} from "../selects";
import {YearSelectionDialog} from "../dialogs";
import ValidationResult from "../../validation/ValidationResult";
import {fetchOrganizationsByName, handleOrganizationSelect} from "../../actions/organizations-actions";
import {fetchFinancialAccountsByName, handleFinancialAccountSelect} from "../../actions/financial-accounts-actions";
import {
    handleAttributeSelect, handleQuarterSelect, handleYearSelect,
    validateFinancialStatisticsSum
} from "../../actions/financial-statistics-actions";
import Typography from "material-ui/es/Typography/Typography";
import Input from "material-ui/es/Input/Input";
import {errorLabelStyle, formStyle} from "../../styles";
import Button from "material-ui/es/Button/Button";
import compose from 'recompose/compose';
import withStyles from "material-ui/es/styles/withStyles";

const styles = theme => formStyle(theme);

class FinancialStatisticsAddingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValidationResult: new ValidationResult(true, ''),
            sum: null
        }
    }

    handleSum = (sum) => {
        this.setState({sum}, () => this.props.validateSum(this.state.sum, false));
    };

    handleAddFinancialStatisticsRequest = () => {
        this.assertAllFieldsAreValid().then(() => {
            if (this.state.formValidationResult.isSuccessful()) {
                const {selectedOrganizationOption, selectedFinancialAccountOption,
                    selectedAttributeOption, selectedQuarterOption, selectedYear, onFormSubmitted} = this.props;
                const {sum} = this.state;

                const organization = selectedOrganizationOption.value;
                const financialAccount = selectedFinancialAccountOption.value;
                const attribute = selectedAttributeOption.value;
                const quarter = selectedQuarterOption.value;
                const year = selectedYear;

                onFormSubmitted({organization, financialAccount, year, quarter, attribute, sum});
            }
        })
    };

    async assertAllFieldsAreValid() {
        const {selectedOrganizationOption, selectedFinancialAccountOption, selectedYear, selectedAttributeOption,
        selectedQuarterOption, validateSum, sumValidationResult} = this.props;
        const {sum} = this.state;

        validateSum(sum, false);

        if (selectedQuarterOption == undefined || selectedFinancialAccountOption == undefined
            || selectedAttributeOption == undefined || selectedYear == undefined
            || selectedOrganizationOption == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
            return;
        }

        if (!sumValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')});
    }

    render() {
        const {selectedOrganizationOption, handleOrganizationSelect, organizations, fetchOrganizations,
            financialAccounts, fetchFinancialAccounts, selectedFinancialAccountOption, handleFinancialAccountSelect,
            selectedYear, handleYearSelect, selectedQuarterOption, quarters, handleQuarterSelect, selectedAttributeOption,
            handleAttributeSelect, attributeOptions, sumValidationResult, classes} = this.props;

        const {formValidationResult} = this.state;

        return <div>
            <Typography variant="headline">Добавление финансовых показателей</Typography>

            <Typography variant="body1">Предприятие (обязательно):</Typography>
            <OrganizationSelect organizations={organizations}
                                selectedOption={selectedOrganizationOption}
                                onSelect={(option) => handleOrganizationSelect(option)}
                                onInput={(nameContains) => fetchOrganizations(nameContains)}
            />

            <Typography variant="body1">Бухгалтеркский счёт (обязательно):</Typography>
            <FinancialAccountSelect financialAccounts={financialAccounts}
                                    selectedOption={selectedFinancialAccountOption}
                                    onInput={(nameContains) => fetchFinancialAccounts(nameContains)}
                                    onSelect={(option) => handleFinancialAccountSelect(option)}
            />

            <Typography variant="body1">Год (обязательно):</Typography>
            <YearSelectionDialog minYear={1955}
                                 maxYear={new Date().getFullYear() + 1}
                                 selectedYear={selectedYear}
                                 onSelect={(year) => handleYearSelect(year)}
                                 disableFuture={true}
                                 disablePast={false}
                                 classes={classes}
            />

            <Typography variant="body1">Квартал (обязательно):</Typography>
            <QuarterSelect onSelect={(option) => handleQuarterSelect(option)}
                           selectedOption={selectedQuarterOption}
                           quarters={quarters}
            />

            <Typography variant="body1">Признак (обязательно):</Typography>
            <AttributeSelect selectedOption={selectedAttributeOption}
                             onSelect={(option) => handleAttributeSelect(option)}
                             attributes={attributeOptions}
            />

            <Typography variant="body1">Сумма (обязательно):</Typography>
            {!sumValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>{sumValidationResult.getMessage()}</Typography>
                : ''}
            <Input fullWidth={true}
                   placeholder={'Введите сумму'}
                   onChange={(event) => this.handleSum(event.target.value)}
            />

            {!formValidationResult.isSuccessful()
                ? <Typography variant="body1" style={errorLabelStyle}>{formValidationResult.getMessage()}</Typography>
                : ''}
            <Button onClick={() => this.handleAddFinancialStatisticsRequest()} variant={'raised'} color={'primary'}>
                Добавить финансовые показатели
            </Button>
        </div>
    }
};

FinancialStatisticsAddingForm.propTypes = {
    organizations: PropTypes.array,
    fetchOrganizations: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    handleOrganizationSelect: PropTypes.func,
    selectedYear: PropTypes.number,
    handleYearSelect: PropTypes.func,
    selectedAttributeOption: PropTypes.object,
    handleAttributeSelect: PropTypes.func,
    attributeOptions: PropTypes.array,
    selectedQuarterOption: PropTypes.object,
    handleQuarterSelect: PropTypes.func,
    quarters: PropTypes.array,
    fetchFinancialAccounts: PropTypes.func,
    selectedFinancialAccountOption: PropTypes.object,
    handleFinancialAccountSelect: PropTypes.func,
    financialAccounts: PropTypes.array,
    validateSum: PropTypes.func,
    sumValidationResult: PropTypes.object,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    const {financialStatisticsAdding} = state;
    const {organizationSelect, quarterSelect, yearDialog, validation, financialAccountSelect, attributeSelect}
        = financialStatisticsAdding;

    return {
        organizations: organizationSelect.data.dataSource,
        selectedOrganizationOption: organizationSelect.data.selectedOption,
        selectedQuarterOption: quarterSelect.data.selectedOption,
        quarters: quarterSelect.data.dataSource,
        selectedAttributeOption: attributeSelect.selectedOption,
        attributeOptions: attributeSelect.attributeOptions,
        selectedYear: yearDialog.selectedYear,
        sumValidationResult: validation.sumValidationResult,
        selectedFinancialAccountOption: financialAccountSelect.selectedOption,
        financialAccounts: financialAccountSelect.dataSource
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrganizations: (nameContains) => dispatch(fetchOrganizationsByName(nameContains)),
        handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
        fetchFinancialAccounts: (nameContains) => dispatch(fetchFinancialAccountsByName(nameContains)),
        handleFinancialAccountSelect: (option) => dispatch(handleFinancialAccountSelect(option)),
        validateSum: (sum, acceptEmpty) => dispatch(validateFinancialStatisticsSum(sum, acceptEmpty)),
        handleYearSelect: (year) => dispatch(handleYearSelect(year)),
        handleAttributeSelect: (option) => dispatch(handleAttributeSelect(option)),
        handleQuarterSelect: (option) => dispatch(handleQuarterSelect(option))
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(FinancialStatisticsAddingForm);