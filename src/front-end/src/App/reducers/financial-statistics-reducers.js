import {financialStatisticsConstants} from "../constants/action-constants";
import ValidationResult from "../validation/ValidationResult";

export const yearSelectReducer = (state = {
    pending: false,
    data: {
        dataSource: null,
        selectedOption: null
    }
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.FETCH_YEARS:
            return {...state, pending: true};
        case financialStatisticsConstants.YEARS_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.years}, error: null};
        case financialStatisticsConstants.YEAR_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        case financialStatisticsConstants.CLEAR_YEAR_SELECTION:
            return {...state, pending: false, data: {dataSource: null, selectedOption: null}, error: null};
        default:
            return state;
    }
};

export const yearDialogReducer = (state = {
    minYear: 1955,
    maxYear: new Date().getFullYear(),
    selectedYear: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.YEAR_SELECTED:
            return {...state, selectedYear: action.selectedYear};
        case financialStatisticsConstants.YEARS_FETCHED:
            return {...state, minYear: Math.min(...action.years), maxYear: Math.max(Math.max(...action.years))};
        case financialStatisticsConstants.SET_DEFAULT_MIN_AND_MAX_YEARS:
            return {...state, minYear: 1955, maxYear: new Date().getFullYear()};
        case financialStatisticsConstants.CLEAR_YEAR_SELECTION:
            return {...state, minYear: 1955, maxYear: new Date().getFullYear(), selectedYear: null};
        default:
            return state;

    }
};

export const minYearDialogReducer = (state = {
    minYear: 1955,
    maxYear: new Date().getFullYear(),
    selectedYear: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.MIN_YEAR_SELECTED:
            return {...state, selectedYear: action.selectedYear};
        case financialStatisticsConstants.YEARS_FETCHED:
            return {...state, minYear: Math.min(...action.years), maxYear: Math.max(Math.max(...action.years))};
        case financialStatisticsConstants.SET_DEFAULT_MIN_AND_MAX_YEARS:
            return {...state, minYear: 1955, maxYear: new Date().getFullYear()};
        case financialStatisticsConstants.CLEAR_MIN_YEAR_SELECTION:
            return {...state, minYear: 1955, maxYear: new Date().getFullYear(), selectedYear: null};
        default:
            return state;
    }
};

export const maxYearDialogReducer = (state = {
    minYear: 1955,
    maxYear: new Date().getFullYear(),
    selectedYear: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.MAX_YEAR_SELECTED:
            return {...state, selectedYear: action.selectedYear}
        case financialStatisticsConstants.YEARS_FETCHED:
            return {...state, minYear: Math.min(...action.years), maxYear: Math.max(Math.max(...action.years))};
        case financialStatisticsConstants.SET_DEFAULT_MIN_AND_MAX_YEARS:
            console.log('default values are being set');
            return {...state, minYear: 1955, maxYear: new Date().getFullYear()};
        case financialStatisticsConstants.CLEAR_MAX_YEAR_SELECTION:
            return {...state, minYear: 1955, maxYear: new Date().getFullYear(), selectedYear: null};
        default:
            return state;
    }
};

export const quarterSelectReducer = (state = {
    data: {
        dataSource: [1, 2, 3, 4],
        selectedOption: null,
    }
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.QUARTER_SELECTED:
            return {...state, data: {...state.data, selectedOption: action.selectedOption}};
        case financialStatisticsConstants.CLEAR_QUARTER_SELECTION:
            return {...state, data: {...state.data, selectedOption: null}};
        default:
            return state;
    }
};

export const financialStatisticsSearchReducer = (state = {
    pending: false,
    data: {
        searchResults: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.FETCH_FINANCIAL_STATISTICS:
            return {...state, pending: true};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_FETCHED:
            return {...state, pending: false, data: {...state.data, searchResults: action.financialStatistics}};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_SEARCH_SUCCESS:
            return {...state, pending: false, data: {...state.data, searchResults: action.financialStatistics}};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_SEARCH_FAILURE:
            return {...state, pending: false, data: null, error: action.error};
        default:
            return state;
    }
};

export const attributeSelectReducer = (state = {
    attributeOptions: [{label: 'Дебит', value: 'debit'}, {label: 'Кредит', value: 'credit'}],
    selectedOption: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.ATTRIBUTE_SELECTED:
            return {...state, selectedOption: action.selectedAttributeOption};
        case financialStatisticsConstants.CLEAR_ATTRIBUTE_SELECT:
            return {...state, selectedOption: null};
        default:
            return state;
    }
};

export const financialStatisticsValidationReducer = (state = {
    minSumValidationResult: new ValidationResult(true, ''),
    maxSumValidationResult: new ValidationResult(true, ''),
    sumValidationResult: new ValidationResult(true, '')
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.FINANCIAL_STATISTICS_SUM_VALDIATED:
            return {...state, sumValidationResult: action.sumValidationResult};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_MIN_SUM_VALIDATED:
            return {...state, minSumValidationResult: action.minSumValidationResult};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_MAX_SUM_VALIDATED:
            return {...state, maxSumValidationResult: action.maxSumValidationResult};
        case financialStatisticsConstants.CLEAR_FINANCIAL_STATISTICS_VALIDATION_STATE:
            return {...state, maxSumValidationResult: new ValidationResult(true, ''),
                minSumValidationResult: new ValidationResult(true, ''),
                sumValidationResult: new ValidationResult(true, '')};
        default:
            return state;
    }
};

export const financialStatisticsAddingReducer = (state = {
    pending: false,
    error: null,
    addedFinancialStatistics: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.ADD_FINANCIAL_STATISTICS:
            return {...state, pending: true, addedFinancialStatistics: null};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_ADDING_SUCCESS:
            return {...state, pending: false, addedFinancialStatistics: action.addedFinancialStatistics, error: null};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_ADDING_FAILURE:
            return {...state, pending: false, error: action.error};
        default:
            return state;
    }
};

export const overallFinancialStatisticsSumReducer = (state = {
    pending: false,
    error: null,
    searchResults: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.FETCH_OVERALL_SUM_BY_FINANCIAL_ACCOUNT:
            return {...state, pending: true, error: null};
        case financialStatisticsConstants.OVERALL_SUM_FETCH_SUCCESS:
            return {...state, pending: false, error: null, searchResults: action.searchResults};
        case financialStatisticsConstants.OVERALL_SUM_FETCH_FAILURE:
            return {...state, pending: false, searchResults: null, error: action.error};
        default:
            return state;
    }
};

export const financialStatisticsUpdateReducer = (state = {
    pending: false,
    initialFinancialStatistics: null,
    updatedFinancialStatistics: null,
    error: null,
    updateSuccess: false
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.UPDATE_FINANCIAL_STATISTICS:
            return {...state, pending: true, updatedFinancialStatistics: null, error: null, updateSuccess: false};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_UPDATE_SUCCESS:
            return {...state, pending: false, updatedFinancialStatistics: action.updatedFinancialStatistics, error: null,
                updateSuccess: true};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_UPDATE_FAILURE:
            return {...state, pending: false, updatedFinancialStatistics: null, error: action.error, updateSuccess: false};
        case financialStatisticsConstants.SINGLE_FINANCIAL_STATISTICS_FETCH_SUCCESS:
            return {...state, pending: false, initialFinancialStatistics: action.financialStatistics, error: null,
                updateSuccess: false, updatedFinancialStatistics: null};
        case financialStatisticsConstants.CLEAR_FINANCIAL_STATISTICS_UPDATE_DIALOG_STATE:
            return {...state, pending: false, updatedFinancialStatistics: null, initialFinancialStatistics: null,
                error: null, updateSuccess: false};
        default:
            return state;
    }
};