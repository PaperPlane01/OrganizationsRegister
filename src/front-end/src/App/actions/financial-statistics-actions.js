import {financialStatisticsConstants} from "../constants/action-constants";
import {API_URL, FINANCIAL_STATISTICS, YEARS} from "../constants/api-constants";
import axios from 'axios';

export const financialStatisticsLoaded = (financialStatisticsList) => {
    return {
        type: financialStatisticsConstants.FINANCIAL_STATISTICS_LOADING_SUCCESS,
        loadedFinancialStatistics: financialStatisticsList
    }
};

export const yearsOfFinancialStatisticsLoaded = (years) => {
    return {
        type: financialStatisticsConstants.YEARS_LOADING_SUCCESS,
        years: years
    }
};

export const yearsCleared = (years) => {
    return {
        type: financialStatisticsConstants.YEARS_CLEARED,
        years: years
    }
};

export const yearSelected = (year) => {
    return {
        type: financialStatisticsConstants.YEAR_SELECTED,
        selectedYear: year
    }
};

export const yearSelectionCleared = (year) => {
    return {
        type: financialStatisticsConstants.YEAR_SELECTION_CLEARED,
        selectedYear: year
    }
};

export const quarterSelected = (quarter) => {
    return {
        type: financialStatisticsConstants.QUARTER_SELECTED,
        selectedQuarter: quarter
    }
};

export const stateCleared = () => {
    return {
        type: financialStatisticsConstants.STATE_CLEARED
    }
};

export const quarterSelectionCleared = (quarter) => {
    return {
        type: financialStatisticsConstants.QUARTER_SELECTION_CLEARED,
        selectedQuarter: quarter
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

export const loadYearsOfFinancialStatistics = (bin) => {
    return (dispatch) => {
        axios.get(API_URL.concat(FINANCIAL_STATISTICS).concat(YEARS), {params: {
            bin: bin
        }}).then(response => {
            dispatch(yearsOfFinancialStatisticsLoaded(response.data))
        })
    }
};

export const handleYearSelect = (year) => {
    return (dispatch) => {
        dispatch(yearSelected(year))
    }
};

export const handleQuarterSelect = (quarter) => {
    return (dispatch) => {
        dispatch(quarterSelected(quarter))
    }
};

export const clearQuarterSelection = () => {
    return (dispatch) => {
        dispatch(quarterSelectionCleared(null));
    }
};

export const clearYears = () => {
    return (dispatch) => {
        dispatch(yearsCleared([]));
    }
};

export const clearYearSelection = () => {
    return (dispatch) => {
        dispatch(yearSelectionCleared(null));
    }
};

export const clearState = () => {
    return (dipsatch) => {
        dipsatch(stateCleared())
    }
};