import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OrganizationSelect from './OrganizationSelect.jsx'
import {handleOrganizationSelect, loadOrganizationsWithNameContains} from "../actions/organizations-actions";
import YearSelect from "./YearSelect.jsx";
import QuarterSelect from "./QuarterSelect.jsx";
import {
    handleQuarterSelect, handleYearSelect,
    loadYearsOfFinancialStatistics
} from "../actions/financial-statistics-actions";
import Button from 'material-ui/Button';
import compose from 'recompose/compose';
import {withStyles} from 'material-ui';
import {formStyle} from "../form-style/";

const styles = theme => formStyle(theme);

class FinancialStatisticsSearchForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearchRequest = () => {
        this.props.handleSearchRequest();
    };

    render() {
        const {classes, fetchOrganizations, handleOrganizationSelect,
            selectedOrganizationOption, handleYearSelect, years, selectedYear, selectedQuarter, loadedOrganizations} = this.props;

        console.log('rendering!');

        selectedOrganizationOption != undefined
            ? this.props.fetchFinancialStatisticsYears(selectedOrganizationOption.value.bin)
            : [];

        return <div>
            <OrganizationSelect onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={loadedOrganizations}
                                onSelect={(option) => handleOrganizationSelect(option)}
                                selectedOption={selectedOrganizationOption}
                                classes={classes}
            />

            <YearSelect years={years}
                        selectedYear={selectedYear}
                        onSelect={(year) => handleYearSelect(year)}
                        classes={classes}
            />

            <QuarterSelect onSelect={(quarter) => handleQuarterSelect(quarter)}
                           selectedQuarter={selectedQuarter}
                           classes={classes}
            />

            <Button color={'primary'} variant={'raised'} onClick={() => this.handleSearchRequest()}>Поиск</Button>
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
    handleYearSelect: PropTypes.func,
    handleQuarterSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func
};

const mapStateToProps = (state) => {
    console.log(state);
    let financialStatisticsSearch = state.financialStatisticsSearch;
    return {
        loadedOrganizations: financialStatisticsSearch.organizations.payload.data.loadedOrganizations,
        selectedOrganizationOption: financialStatisticsSearch.organizations.payload.data.selectedOrganizationOption,
        years: financialStatisticsSearch.financialStatistics.payload.data.years,
        loadedFinancialStatistics: financialStatisticsSearch.financialStatistics.payload.data.financialStatisticsSearchResults,
        selectedYear: financialStatisticsSearch.financialStatistics.payload.data.selectedYear,
        selectedQuarter: financialStatisticsSearch.financialStatistics.payload.data.selectedQuarter
    }
};

const mapDispatchToProps = (dispatch) => {
     return {
         fetchOrganizations: (nameContains) => dispatch(loadOrganizationsWithNameContains(nameContains)),
         fetchFinancialStatisticsYears: (organizationBIN) => dispatch(loadYearsOfFinancialStatistics(organizationBIN)),
         handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
         handleQuarterSelect: (quarter) => dispatch(handleQuarterSelect(quarter)),
         handleYearSelect: (year) => dispatch(handleYearSelect(year))
     }
 };

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FinancialStatisticsSearchForm)