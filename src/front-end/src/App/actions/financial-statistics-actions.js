import {financialStatisticsConstants} from "../constants/action-constants";
import {API_URL, FINANCIAL_STATISTICS, YEARS} from "../constants/api-constants";
import axios from 'axios';

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
        selectedOption: year
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

export const handleYearSelect = (yearOption) => {
    return (dispatch) => {
        dispatch(yearSelected(yearOption))
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