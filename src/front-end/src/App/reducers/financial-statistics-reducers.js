import {financialStatisticsConstants} from "../constants/action-constants";

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
            console.log(action.years);
            return {...state, pending: false, data: {...state.data, dataSource: action.years}, error: null};
        case financialStatisticsConstants.YEAR_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        case financialStatisticsConstants.CLEAR_YEAR_SELECTION:
            return {...state, pending: false, data: {dataSource: null, selectedOption: null}, error: null};
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
            console.log('clearing quarter selection');
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
        default:
            return state;
    }
};