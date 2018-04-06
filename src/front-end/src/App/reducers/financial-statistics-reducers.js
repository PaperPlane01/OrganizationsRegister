import {financialStatisticsConstants} from "../constants/action-constants";

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
        case financialStatisticsConstants.LOAD_YEARS_OF_FINANCIAL_STATISTICS:
            return {...state, pending: true};
        case financialStatisticsConstants.YEARS_LOADING_SUCCESS:
            return {...state, pending: false, payload: {data: {
                ...state.payload.data, years: action.years
            }}};
        case financialStatisticsConstants.YEAR_SELECTED:
            return {...state, payload: {data: {...state.payload.data, year: action.year}}};
        case financialStatisticsConstants.QUARTER_SELECTED:
            return {...state, payload: {data: {...state.payload.data, quarter: action.quarter}}};
        default:
            return state;
    }
};