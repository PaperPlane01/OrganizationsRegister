import {financialStatisticsConstants} from "../constants/action-constants";

export const financialStatisticsSearchReducer = (state = {
    pending: false,
    payload: {data: {}},
    error: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.LOAD_YEARS_OF_FINANCIAL_STATISTICS:
            return {...state, pending: true};
        case financialStatisticsConstants.YEARS_LOADING_SUCCESS:
            return {...state, pending: false, payload: {data: {...state.payload.data, years: action.years}}};
        case financialStatisticsConstants.YEAR_SELECTED:
            return {...state, pending: false, payload: {data: {...state.payload.data, year: action.selectedYear}}};
        case financialStatisticsConstants.QUARTER_SELECTED:
            return {...state, pending: false, payload: {data: {...state.payload.data, quarter: action.selectedQuarter}}};
        case financialStatisticsConstants.STATE_CLEARED:
            return {...state, payload: {data: {...state.payload.data, quarter: null, year: null, years: null}}};
        default:
            return state;
    }
};

export const financialStatisticsReducer = (state = {
    pending: false,
    payload: {data: {}},
    error: null
}, action) => {
    switch (action.type) {
        case financialStatisticsConstants.LOAD_FINANCIAL_STATISTICS:
            return {...state, pending: true};
        case financialStatisticsConstants.FINANCIAL_STATISTICS_LOADING_SUCCESS:
            return {...state, pending: false, payload: {data: {
                ...state.payload.data, financialStatisticsSearchResults: action.loadedFinancialStatistics
            }}};
        default:
            return state;
    }
};