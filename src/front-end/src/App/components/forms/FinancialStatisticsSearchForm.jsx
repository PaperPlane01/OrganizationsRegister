import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OrganizationSelect from '../selects/OrganizationSelect.jsx'
import {fetchOrganizationsByName, handleOrganizationSelect} from "../../actions/organizations-actions";
import YearSelect from "../selects/YearSelect.jsx";
import QuarterSelect from "../selects/QuarterSelect.jsx";
import {
    clearQuarterSelection, clearYearSelection, fetchYearsOfFinancialStatistics,
    handleQuarterSelect, handleYearSelect,
} from "../../actions/financial-statistics-actions";
import Button from 'material-ui/Button';
import compose from 'recompose/compose';
import {withStyles} from 'material-ui';
import {formStyle} from "../../styles/index";
import Typography from "material-ui/es/Typography/Typography";
import ValidationResult from "../../validation/ValidationResult";

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

    clearState = () => {
        this.props.clearYearSelection();
        this.props.clearQuarterSelection();
    };

    handleSearchRequest = () => {
        const {selectedOrganizationOption, selectedYearOption, selectedQuarterOption} = this.props;

        if (selectedOrganizationOption == undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Вы не выбрали организацию.')});
            return;
        }

        if (selectedYearOption == undefined && selectedQuarterOption != undefined) {
            this.setState({formValidationResult: new ValidationResult(false, 'Вы не выбрали год.')});
            return;
        }

        const year = selectedYearOption == undefined ? null : selectedYearOption.value;
        const quarter = selectedQuarterOption == undefined ? null : selectedQuarterOption.value;

        this.setState({formValidationResult: new ValidationResult(true, '')}, () => {
            this.props.onFormSubmitted(selectedOrganizationOption.value.bin, year, quarter);
        });
    };

    handleOrganizationSelect = (option) => {
        if (option == undefined) {
            this.clearState();
        };

        this.props.handleOrganizationSelect(option);
    };

    render() {
        const {classes, fetchOrganizations, selectedOrganizationOption, handleYearSelect, handleQuarterSelect,
            years, selectedYearOption, quarters, selectedQuarterOption, fetchedOrganizations} = this.props;

        return <div>
            <Typography variant="headline">Поиск финансовой статистики</Typography>

            <Typography variant="body1">Организация:</Typography>
            <OrganizationSelect onInput={(nameContains) => fetchOrganizations(nameContains)}
                                organizations={fetchedOrganizations}
                                onSelect={(option) => this.handleOrganizationSelect(option)}
                                selectedOption={selectedOrganizationOption}
                                classes={classes}
            />

            <Typography variant="body1">Год:</Typography>
            <YearSelect years={years}
                        selectedOption={selectedYearOption}
                        onSelect={(option) => handleYearSelect(option)}
                        classes={classes}
            />

            <Typography variant="body1">Квартал:</Typography>
            <QuarterSelect onSelect={(option) => handleQuarterSelect(option)}
                           selectedOption={selectedQuarterOption}
                           quarters={quarters}
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
    fetchedOrganizations: PropTypes.array,
    handleOrganizationSelect: PropTypes.func,
    selectedOrganizationOption: PropTypes.object,
    years: PropTypes.array,
    quarters: PropTypes.array,
    selectedQuarterOption: PropTypes.object,
    selectedYearOption: PropTypes.object,
    handleYearSelect: PropTypes.func,
    handleQuarterSelect: PropTypes.func,
    onFormSubmitted: PropTypes.func,
    clearYearSelection: PropTypes.func,
    clearQuarterSelection: PropTypes.func
};

const mapStateToProps = (state) => {
    const financialStatisticsSearch = state.financialStatisticsSearch;
    const {organizationSelect, yearSelect, quarterSelect} = financialStatisticsSearch;
    return {
        fetchedOrganizations: organizationSelect.data.dataSource,
        selectedOrganizationOption: organizationSelect.data.selectedOption,
        years: yearSelect.data.dataSource,
        quarters: quarterSelect.data.dataSource,
        loadedFinancialStatistics: financialStatisticsSearch.financialStatistics.data.searchResults,
        selectedYearOption: yearSelect.data.selectedOption,
        selectedQuarterOption: quarterSelect.data.selectedOption,
    }
};

const mapDispatchToProps = (dispatch) => {
     return {
         fetchOrganizations: (nameContains) => dispatch(fetchOrganizationsByName(nameContains)),
         fetchFinancialStatisticsYears: (organizationBIN) => dispatch(fetchYearsOfFinancialStatistics(organizationBIN)),
         handleOrganizationSelect: (option) => dispatch(handleOrganizationSelect(option)),
         handleQuarterSelect: (option) => dispatch(handleQuarterSelect(option)),
         handleYearSelect: (option) => dispatch(handleYearSelect(option)),
         clearYearSelection: () => dispatch(clearYearSelection()),
         clearQuarterSelection: () => dispatch(clearQuarterSelection())
     }
 };

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(FinancialStatisticsSearchForm)