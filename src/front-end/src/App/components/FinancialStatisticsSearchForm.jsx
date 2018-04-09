import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OrganizationSelect from './OrganizationSelect.jsx'
import {handleOrganizationSelect, loadOrganizationsWithNameContains} from "../actions/organizations-actions";
import YearSelect from "./YearSelect.jsx";
import QuarterSelect from "./QuarterSelect.jsx";
import {
    clearQuarterSelection, clearState,
    clearYears, clearYearSelection,
    handleQuarterSelect, handleYearSelect,
    loadYearsOfFinancialStatistics
} from "../actions/financial-statistics-actions";
import Button from 'material-ui/Button';
import compose from 'recompose/compose';
import {withStyles} from 'material-ui';
import {formStyle} from "../form-style/";
import Typography from "material-ui/es/Typography/Typography";
import ValidationResult from "../validation/ValidationResult";

const styles = theme => formStyle(theme);

class FinancialStatisticsSearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValidationResult: new ValidationResult(true, ''),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedOrganizationOption != undefined && nextProps.years == undefined) {
            this.props.fetchFinancialStatisticsYears(nextProps.selectedOrganizationOption.value.bin);
        }
    }

    handleSearchRequest = () => {
        if (this.props.selectedOrganizationOption == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Вы не выбрали организацию.')});
            return;
        }

        if (this.props.selectedYear == undefined && this.props.selectedQuarter != undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Вы не выбрали год.')});
            return;
        }

        this.setState({formValidationResult: new ValidationResult(true, '')}, () => {
            this.props.onFormSubmitted(this.props.selectedOrganizationOption.value.bin, this.props.selectedYear,
                this.props.selectedQuarter);
        });
    };

    handleOrganizationSelect = (option) => {
        if (option == undefined) {
            this.props.clearState();
        };

        this.props.handleOrganizationSelect(option);
    };

    render() {
        const {classes, fetchOrganizations, handleOrganizationSelect,
            selectedOrganizationOption, handleYearSelect, handleQuarterSelect, years, selectedYear,
            selectedQuarter, loadedOrganizations} = this.props;

        return <div>
            <Typography variant="headline">Поиск финансовой статистики</Typography>

            <Typography variant="body1">Организация:</Typography>
            <OrganizationSelect onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={loadedOrganizations}
                                onSelect={(option) => this.handleOrganizationSelect(option)}
                                selectedOption={selectedOrganizationOption}
                                classes={classes}
            />

            <Typography variant="body1">Год:</Typography>
            <YearSelect years={years}
                        selectedYear={selectedYear}
                        onSelect={(option) => option == undefined ? handleYearSelect(null) : handleYearSelect(option.value)}
                        classes={classes}
            />

            <Typography variant="body1">Квартал:</Typography>
            <QuarterSelect onSelect={(option) => option == undefined ? handleQuarterSelect(null) : handleQuarterSelect(option.value)}
                           selectedQuarter={selectedQuarter}
                           classes={classes}
            />

            {!this.state.formValidationResult.isSuccessful()
                ? <Typography variant="body1" style={{'color': 'red'}}>{this.state.formValidationResult.getMessage()}</Typography>
                : ''
            }
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
    loadedOrganizations: PropTypes.array,
    handleOrganizationSelect: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    years: PropTypes.array,
    selectedQuarter: PropTypes.number,
    selectedYear: PropTypes.number,
    handleYearSelect: PropTypes.func,
    handleQuarterSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func,
    clearState: PropTypes.func
};

const mapStateToProps = (state) => {
    console.log(state);
    let financialStatisticsSearch = state.financialStatisticsSearch;
    return {
        loadedOrganizations: financialStatisticsSearch.organizations.payload.data.loadedOrganizations,
        selectedOrganizationOption: financialStatisticsSearch.organizations.payload.data.selectedOrganizationOption,
        years: financialStatisticsSearch.searchCriteria.payload.data.years,
        loadedFinancialStatistics: financialStatisticsSearch.financialStatistics.payload.data.financialStatisticsSearchResults,
        selectedYear: financialStatisticsSearch.searchCriteria.payload.data.year,
        selectedQuarter: financialStatisticsSearch.searchCriteria.payload.data.quarter
    }
};

const mapDispatchToProps = (dispatch) => {
     return {
         fetchOrganizations: (nameContains) => dispatch(loadOrganizationsWithNameContains(nameContains)),
         fetchFinancialStatisticsYears: (organizationBIN) => dispatch(loadYearsOfFinancialStatistics(organizationBIN)),
         handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
         handleQuarterSelect: (quarter) => dispatch(handleQuarterSelect(quarter)),
         handleYearSelect: (year) => dispatch(handleYearSelect(year)),
         clearState: () => dispatch(clearState())
     }
 };

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FinancialStatisticsSearchForm)