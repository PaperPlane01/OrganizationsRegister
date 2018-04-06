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

export const yearSelected = (year) => {
    return {
        type: financialStatisticsConstants.YEAR_SELECTED,
        year: year
    }
};

export const quarterSelected = (quarter) => {
    return {
        type: financialStatisticsConstants.QUARTER_SELECTED,
        quarter: quarter
    }
};

export const loadFinancialStatistics = (bin, year, quarter) => {
    let params = {bin: bin};

    if (year != undefined) {
        params = {...params, year: year};
    }

    if (quarter != undefined) {
        params = {...params, quarter: quarter};
    }

    return (dispatch) => {
        axios.get(API_URL.concat(FINANCIAL_STATISTICS), {params: params
        }).then(response => {
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