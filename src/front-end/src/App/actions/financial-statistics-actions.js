import {financialStatisticsConstants} from "../constants/action-constants";
import {API_URL, FINANCIAL_STATISTICS, OVERALL_SUM, SEARCH, YEARS} from "../constants/api-constants";
import axios from 'axios';
import {exceptions} from "../constants/exception-constants";
import Validation from "../validation/Validation";

export const financialStatisticsLoaded = (financialStatisticsList) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_FETCHED,
        financialStatistics: financialStatisticsList
    }
};

export const yearsOfFinancialStatisticsFetched = (years) => {
    return {
        type: financialStatisticsConstants.YEARS_FETCHED,
        years: years
    }
};

export const yearSelected = (year) => {
    return {
        type: financialStatisticsConstants.YEAR_SELECTED,
        selectedYear: year
    }
};

export const quarterSelected = (quarterOption) => {
    return {
        type: financialStatisticsConstants.QUARTER_SELECTED,
        selectedOption: quarterOption
    }
};

export const loadFinancialStatistics = (bin, year, quarter) => {
    let params = {bin: bin};

    if (year != undefined) {
        params.year = year;
    }

    if (quarter != undefined) {
        params.quarter = quarter;
    }

    return (dispatch) => {
        axios.get(API_URL.concat(FINANCIAL_STATISTICS), {params: {...params}})
            .then(response => {
                dispatch(financialStatisticsLoaded(response.data))
            })
    }
};

export const fetchYearsOfFinancialStatistics = (bin) => {
    return (dispatch) => {
        axios.get(API_URL.concat(FINANCIAL_STATISTICS).concat(YEARS), {params: {
            bin: bin
        }}).then(response => {
            dispatch(yearsOfFinancialStatisticsFetched(response.data))
        })
    }
};

export const handleYearSelect = (year) => {
    return (dispatch) => {
        dispatch(yearSelected(year))
    }
};

export const handleQuarterSelect = (quarterOption) => {
    return (dispatch) => {
        dispatch(quarterSelected(quarterOption))
    }
};

export const handleClearQuarterSelectionRequest = () => {
    return {
        type: financialStatisticsConstants.CLEAR_QUARTER_SELECTION
    }
};

export const clearQuarterSelection = () => {
    return (dispatch) => {
        dispatch(handleClearQuarterSelectionRequest());
    }
};

export const setDefaultMinAndMaxYears = () => {
    return {
        type: financialStatisticsConstants.SET_DEFAULT_MIN_AND_MAX_YEARS
    }
};

export const handleClearYearSelectionRequest = () => {
    return {
        type: financialStatisticsConstants.CLEAR_YEAR_SELECTION
    }
};

export const clearYearSelection = () => {
   return (dispatch) => {
       dispatch(handleClearYearSelectionRequest());
   }
};

export const minYearSelected = (minYear) => {
    return {
        type: financialStatisticsConstants.MIN_YEAR_SELECTED,
        selectedYear: minYear
    }
};

export const handleMinYearSelection = (minYear) => {
    return (dispatch) => {
        dispatch(minYearSelected(minYear))
    }
};

export const maxYearSelected = (maxYear) => {
    return {
        type: financialStatisticsConstants.MAX_YEAR_SELECTED,
        selectedYear: maxYear
    }
};

export const handleMaxYearSelection = (maxYear) => {
    return (dispatch) => {
        dispatch(maxYearSelected(maxYear));
    }
};

export const clearMinYearSelection = () => {
    return {
        type: financialStatisticsConstants.CLEAR_MIN_YEAR_SELECTION
    }
};

export const clearMaxYearSelection = () => {
    return {
        type: financialStatisticsConstants.CLEAR_MAX_YEAR_SELECTION
    }
};

export const financialStatisticsSearchSuccess = (financialStatistics) => {
  return {
      type: financialStatisticsConstants.FINANCIAL_STATISTICS_SEARCH_SUCCESS,
      financialStatistics: financialStatistics
  }
};

export const financialStatisticsSearchFailure = (error) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_SEARCH_FAILURE,
        error: error
    }
};

export const attributeSelected = (option) => {
    return {
        type: financialStatisticsConstants.ATTRIBUTE_SELECTED,
        selectedAttributeOption: option
    }
};

export const handleAttributeSelect = (option) => {
    return (dispatch) => {
        dispatch(attributeSelected(option));
    }
};

export const searchFinancialStatisticsByCriteria = (searchCriteria) => {
    return (dispatch) => {
        axios.post(API_URL.concat(FINANCIAL_STATISTICS).concat(SEARCH), JSON.stringify(searchCriteria), {
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            dispatch(financialStatisticsSearchSuccess(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(financialStatisticsSearchFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(financialStatisticsSearchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const financialStatisticsSumValidated = (validationResult) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_SUM_VALDIATED,
        sumValidationResult: validationResult
    }
};

export const validateFinancialStatisticsSum = (sum, acceptEmpty) => {
    return (dispatch) => {
        dispatch(financialStatisticsSumValidated(Validation.validateFinancialStatisticsSum(sum, acceptEmpty)));
    }
};

export const financialStatisticsMinSumValidated = (validationResult) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_MIN_SUM_VALIDATED,
        minSumValidationResult: validationResult
    }
};

export const validateFinancialStatisticsMinSum = (minSum, acceptEmpty) => {
    return (dispatch) => {
        dispatch(financialStatisticsMinSumValidated(Validation.validateFinancialStatisticsSum(minSum, acceptEmpty)));
    }
};

export const financialStatisticsMaxSumValidated = (validationResult) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_MAX_SUM_VALIDATED,
        maxSumValidationResult: validationResult
    }
};

export const validateFinancialStatisticsMaxSum = (maxSum, acceptEmpty) => {
    return (dispatch) => {
        dispatch(financialStatisticsMaxSumValidated(Validation.validateFinancialStatisticsSum(maxSum, acceptEmpty)));
    }
};

export const financialStatisticsAddingSuccess = (addedFinancialStatistics) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_ADDING_SUCCESS,
        addedFinancialStatistics
    }
};

export const financialStatisticsAddingFailure = (error) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_ADDING_FAILURE,
        error
    }
};

export const addFinancialStatistics = (financialStatistics) => {
    return (dispatch) => {
        axios.post(API_URL.concat(FINANCIAL_STATISTICS), JSON.stringify(financialStatistics), {
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch(financialStatisticsAddingSuccess(response.data));
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(financialStatisticsAddingFailure({status: response.status, exception: response.data.exception}));
            } else {
                dispatch(financialStatisticsAddingFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const overallSumFetched = (searchResults) => {
    return {
        type: financialStatisticsConstants.OVERALL_SUM_FETCH_SUCCESS,
        searchResults
    }
};

export const overallSumFetchFailure = (error) => {
    return {
        type: financialStatisticsConstants.OVERALL_SUM_FETCH_FAILURE,
        error
    }
};

export const fetchOverallSumOfFinancialAccounts = (financialAccount) => {
    const url = API_URL.concat(FINANCIAL_STATISTICS).concat(OVERALL_SUM);

    return (dispatch) => {
        if (financialAccount == undefined) {
            axios.get(url).then(response => {
                dispatch(overallSumFetched(response.data))
            }).catch(error => {
                const response = error.response;

                if (response.data.exception != undefined) {
                    dispatch(overallSumFetchFailure({status: error.status, exception: response.data.exception}));
                } else {
                    dispatch(overallSumFetchFailure({status: error.status, exception: exceptions.SERVER_ERROR}));
                }
            })
        } else {
            axios.get(url, {params: {
                financialAccountID: financialAccount.id
            }}).then(response => {
                dispatch(overallSumFetched(response.data))
            }).catch(error => {
                const response = error.response;

                if (response.data.exception != undefined) {
                    dispatch(overallSumFetchFailure({status: error.status, exception: response.data.exception}));
                } else {
                    dispatch(overallSumFetchFailure({status: error.status, exception: exceptions.SERVER_ERROR}));
                }
            })
        }
    };
};

export const financialStatisticsFetched = (financialStatistics) => {
    return {
        type: financialStatisticsConstants.SINGLE_FINANCIAL_STATISTICS_FETCH_SUCCESS,
        financialStatistics
    }
};

export const financialStatisticsFetchFailure = (error) => {
    return {
        type: financialStatisticsConstants.SINGLE_FINANCIAL_STATISTICS_FETCH_FAILURE,
        error
    }
};

export const fetchFinancialStatisticsById = (id) => {
    return (dispatch) => {
        return axios.get(API_URL.concat(FINANCIAL_STATISTICS).concat("/").concat(id)).then(response => {
            dispatch(financialStatisticsFetched(response.data));
            return response.data;
        }).catch(error => {
            const response = error.response;

            if (response.data.exception != undefined) {
                dispatch(financialStatisticsFetchFailure({status: response.status, exception: reponse.data.exception}));
            } else {
                dispatch(financialStatisticsFetchFailure({status: response.status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const financialStatisticsUpdateSuccess = (updatedFinancialStatistics) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_UPDATE_SUCCESS,
        updatedFinancialStatistics
    }
};

export const financialStatisticsUpdateFailure = (error) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_UPDATE_FAILURE,
        error
    }
};

export const updateFinancialStatistics = (financialStatistics) => {
    return (dispatch) => {
        return axios.put(API_URL.concat(FINANCIAL_STATISTICS), JSON.stringify(financialStatistics), {
            headers: {
                'Content-type': 'application/json',
                token: localStorage.getItem('token')
            }
        }).then(response => {
            dispatch(financialStatisticsUpdateSuccess(response.data));
            return response.data;
        }).catch(error => {
            const response = error.response;
            const exception = response.data.exception;
            const status = response.status;

            if (exception != undefined) {
                dipsatch(financialStatisticsUpdateFailure({status, exception}));
            } else {
                dispatch(financialStatisticsUpdateFailure({status, exception: exceptions.SERVER_ERROR}));
            }
        })
    }
};

export const clearAttributeSelect = () => {
    return {
        type: financialStatisticsConstants.CLEAR_ATTRIBUTE_SELECT
    }
};

export const clearFinancialStatisticsValidationState = () => {
    return {
        type: financialStatisticsConstants.CLEAR_FINANCIAL_STATISTICS_VALIDATION_STATE
    }
};

export const clearFinancialStatisticsUpdateDialogState = () => {
    return {
        type: financialStatisticsConstants.CLEAR_FINANCIAL_STATISTICS_UPDATE_DIALOG_STATE
    }
}