import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {OrganizationSelect, QuarterSelect, AttributeSelect} from '../selects'
import {fetchOrganizationsByName, handleOrganizationSelect} from "../../actions/organizations-actions";
import {
    clearMaxYearSelection,
    clearMinYearSelection,
    clearQuarterSelection, fetchYearsOfFinancialStatistics, handleAttributeSelect,
    handleMaxYearSelection,
    handleMinYearSelection,
    handleQuarterSelect, setDefaultMinAndMaxYears, validateFinancialStatisticsMaxSum, validateFinancialStatisticsMinSum,
} from "../../actions/financial-statistics-actions";
import Button from 'material-ui/Button';
import compose from 'recompose/compose';
import {withStyles} from 'material-ui';
import {errorLabelStyle, formStyle} from "../../styles";
import Typography from "material-ui/Typography";
import ValidationResult from "../../validation/ValidationResult";
import {YearSelectionDialog} from '../dialogs';
import Input from "material-ui/Input";
import {FinancialAccountSelect} from "../selects";
import {fetchFinancialAccountsByName, handleFinancialAccountSelect} from "../../actions/financial-accounts-actions";

const styles = theme => formStyle(theme);

class FinancialStatisticsSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minSum: null,
            maxSum: null,
            formValidationResult: new ValidationResult(true, '')
        }
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.selectedOrganizationOption == undefined) {
          this.props.setDefaultMinAndMaxYears();
          return;
       }

       if (nextProps.selectedOrganizationOption !== this.props.selectedOrganizationOption) {
           this.props.fetchFinancialStatisticsYears(nextProps.selectedOrganizationOption.value.bin);
       }
    }

    clearState = () => {
        this.props.clearMinYearSelection();
        this.props.clearMaxYearSelection();
        this.props.clearQuarterSelection();
    };

    handleSearchRequest = () => {
        const {selectedOrganizationOption, selectedQuarterOption, selectedAttributeOption,
            selectedMinYear, selectedMaxYear, selectedFinancialAccountOption} = this.props;
        const {minSum, maxSum} = this.state;

        this.assertAllFieldsAreValid().then(() => {
            const quarter = selectedQuarterOption == undefined ? null : selectedQuarterOption.value;
            const organization = selectedOrganizationOption == undefined ? null : selectedOrganizationOption.value;
            const attribute = selectedAttributeOption == undefined ? null : selectedAttributeOption.value;
            const financialAccount = selectedFinancialAccountOption == undefined ? null : selectedFinancialAccountOption.value;

            this.props.onFormSubmitted({organization, minYear: selectedMinYear, maxYear: selectedMaxYear,
                quarter, attribute, minSum, maxSum, financialAccount});
        });

    };

    async assertAllFieldsAreValid() {
        const {minSum, maxSum} = this.state;
        const {validateMinSum, validateMaxSum, minSumValidationResult, maxSumValidationResult} = this.props;

        validateMinSum(minSum, true);
        validateMaxSum(maxSum, true);

        if (minSumValidationResult.isSuccessful() && maxSumValidationResult.isSuccessful()) {
            this.setState({formValidationResult: new ValidationResult(true, '')});
        } else {
            this.setState({formValidationResult: new ValidationResult(false, 'Некоторые поля заполнены неверно.')})
        }
    }

    handleOrganizationSelect = (option) => {
        this.props.handleOrganizationSelect(option);
    };

    handleMinSum = (minSum) => {
        this.setState({minSum}, () => this.props.validateMinSum(this.state.minSum, true));
    };

    handleMaxSum = (maxSum) => {
        this.setState({maxSum}, () => this.props.validateMaxSum(this.state.maxSum, true));
    };

    render() {
        const {classes, fetchOrganizations, selectedOrganizationOption, handleQuarterSelect, quarters,
            selectedQuarterOption, fetchedOrganizations, minYear, maxYear, selectedMinYear, selectedMaxYear,
            handleMinYearSelect, handleMaxYearSelect, selectedAttributeOption, handleAttributeSelect, attributes,
            minSumValidationResult, maxSumValidationResult, financialAccounts, fetchFinancialAccounts,
            selectedFinancialAccountOption, handleFinancialAccountSelect} = this.props;
        const {formValidationResult} = this.state;

        return <div>
            <Typography variant="headline">Поиск финансовых показателей</Typography>

            <Typography variant="body1">Предприятие:</Typography>
            <OrganizationSelect onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={fetchedOrganizations}
                                onSelect={(option) => this.handleOrganizationSelect(option)}
                                selectedOption={selectedOrganizationOption}
                                classes={classes}
            />

            <Typography variant="body1">Бухгалтерский счёт:</Typography>
            <FinancialAccountSelect financialAccounts={financialAccounts}
                                    onInput={(nameContains) => fetchFinancialAccounts(nameContains)}
                                    selectedOption={selectedFinancialAccountOption}
                                    classes={classes}
                                    onSelect={(option) => handleFinancialAccountSelect(option)}
            />

            <Typography variant="body1">Минимальный год:</Typography>
            <YearSelectionDialog onSelect={(year) => handleMinYearSelect(year)}
                                 classes={classes}
                                 minYear={minYear}
                                 maxYear={maxYear + 1}
                                 selectedYear={selectedMinYear}
                                 disablePast={false}
                                 disableFuture={true}
            />

            <Typography variant="body1">Максимальный год:</Typography>
            <YearSelectionDialog onSelect={(year) => handleMaxYearSelect(year)}
                                 classes={classes}
                                 minYear={minYear}
                                 maxYear={maxYear + 1}
                                 selectedYear={selectedMaxYear}
                                 disablePast={false}
                                 disableFuture={true}
            />

            <Typography variant="body1">Квартал:</Typography>
            <QuarterSelect onSelect={(option) => handleQuarterSelect(option)}
                           selectedOption={selectedQuarterOption}
                           quarters={quarters}
                           classes={classes}
            />

            {minSumValidationResult.isSuccessful()
                ? ''
                : <Typography variant={'body1'} style={errorLabelStyle}>
                    {minSumValidationResult.getMessage()}
                </Typography>}
            <Typography variant="body1">Минимальная сумма:</Typography>
            <Input placeholder={'Введите минимальную сумму'}
                   fullWidth={true}
                   onChange={(event) => this.handleMinSum(event.target.value)}
            />

            {maxSumValidationResult.isSuccessful()
                ? ''
                : <Typography variant="body1" style={errorLabelStyle}>
                    {maxSumValidationResult.getMessage()}
                </Typography>}
            <Typography variant="body1">Максимальная сумма:</Typography>
            <Input placeholder={'Введите максимальную сумму'}
                   fullWidth={true}
                   onChange={(event) => this.handleMaxSum(event.target.value)}
            />

            <Typography variant="body1">Признак:</Typography>
            <AttributeSelect onSelect={(option) => handleAttributeSelect(option)}
                             selectedOption={selectedAttributeOption}
                             attributes={attributes}
            />

            {formValidationResult.isSuccessful()
                ? ''
                : <Typography variant="body1" style={errorLabelStyle}>
                    {formValidationResult.getMessage()}
                </Typography>}
            <Button color={'primary'} variant={'raised'}
                    onClick={() => this.handleSearchRequest()}>
                Поиск
            </Button>
        </div>
    }
 }

FinancialStatisticsSearchForm.propTypes = {
    fetchOrganizations: PropTypes.func,
    fetchFinancialStatisticsYears: PropTypes.func,
    fetchedOrganizations: PropTypes.array,
    handleOrganizationSelect: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    quarters: PropTypes.array,
    selectedQuarterOption: PropTypes.object,
    selectedYearOption: PropTypes.object,
    selectedMinYear: PropTypes.number,
    selectedMaxYear: PropTypes.number,
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    handleMinYearSelect: PropTypes.func,
    handleMaxYearSelect: PropTypes.func,
    handleQuarterSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func,
    clearYearSelection: PropTypes.func,
    clearMinYearSelection: PropTypes.func,
    clearMaxYearSelection: PropTypes.func,
    clearQuarterSelection: PropTypes.func,
    setDefaultMinAndMaxYears: PropTypes.func,
    selectedAttributeOption: PropTypes.object,
    handleAttributeSelect: PropTypes.func,
    validateMinSum: PropTypes.func,
    minSumValidationResult: PropTypes.object,
    validateMaxSum: PropTypes.func,
    maxSumValidationResult: PropTypes.object,
    attributes: PropTypes.array,
    financialAccounts: PropTypes.array,
    selectedFinancialAccountOption: PropTypes.object,
    handleFinancialAccountSelect: PropTypes.func,
    fetchFinancialAccounts: PropTypes.func
};

const mapStateToProps = (state) => {
    const financialStatisticsSearch = state.financialStatisticsSearch;
    const {organizationSelect, quarterSelect, minYearDialog, maxYearDialog, attributeSelect, validation,
        financialAccountSelect}
    = financialStatisticsSearch;
    return {
        fetchedOrganizations: organizationSelect.data.dataSource,
        selectedOrganizationOption: organizationSelect.data.selectedOption,
        minYear: minYearDialog.minYear,
        maxYear: minYearDialog.maxYear,
        selectedMinYear: minYearDialog.selectedYear,
        selectedMaxYear: maxYearDialog.selectedYear,
        quarters: quarterSelect.data.dataSource,
        loadedFinancialStatistics: financialStatisticsSearch.financialStatistics.data.searchResults,
        selectedQuarterOption: quarterSelect.data.selectedOption,
        selectedAttributeOption: attributeSelect.selectedOption,
        attributes: attributeSelect.attributeOptions,
        minSumValidationResult: validation.minSumValidationResult,
        maxSumValidationResult: validation.maxSumValidationResult,
        selectedFinancialAccountOption: financialAccountSelect.selectedOption,
        financialAccounts: financialAccountSelect.dataSource,
    }
};

const mapDispatchToProps = (dispatch) => {
     return {
         fetchOrganizations: (nameContains) => dispatch(fetchOrganizationsByName(nameContains)),
         fetchFinancialStatisticsYears: (organizationBIN) => dispatch(fetchYearsOfFinancialStatistics(organizationBIN)),
         handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
         handleQuarterSelect: (option) => dispatch(handleQuarterSelect(option)),
         handleMinYearSelect: (minYear) => dispatch(handleMinYearSelection(minYear)),
         handleMaxYearSelect: (maxYear) => dispatch(handleMaxYearSelection(maxYear)),
         clearMinYearSelection: () => dispatch(clearMinYearSelection()),
         clearMaxYearSelection: () => dispatch(clearMaxYearSelection()),
         setDefaultMinAndMaxYears: () => dispatch(setDefaultMinAndMaxYears()),
         clearQuarterSelection: () => dispatch(clearQuarterSelection()),
         handleAttributeSelect: (option) => dispatch(handleAttributeSelect(option)),
         validateMinSum: (sum, acceptEmpty) => dispatch(validateFinancialStatisticsMinSum(sum, acceptEmpty)),
         validateMaxSum: (sum, acceptEmpty) => dispatch(validateFinancialStatisticsMaxSum(sum, acceptEmpty)),
         fetchFinancialAccounts: (nameContains) => dispatch(fetchFinancialAccountsByName(nameContains)),
         handleFinancialAccountSelect: (option) => dispatch(handleFinancialAccountSelect(option))
     }
 };

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FinancialStatisticsSearchForm)