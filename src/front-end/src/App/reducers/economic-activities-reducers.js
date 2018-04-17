import {economicActivitiesActionsConstants} from "../constants/action-constants";

export const primaryEconomicActivitySelectReducer = (state = {
    pending: false,
    data: {
        selectedOption: null,
        dataSource: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.FETCH_ECONOMIC_ACTIVITIES_BY_NAME:
            return {...state, pending: true};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.economicActivities}};
        case economicActivitiesActionsConstants.PRIMARY_ECONOMIC_ACTIVITY_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOption: action.selectedOption}};
        default: return state;
    }
};

export const permittedEconomicActivitiesSelectReducer = (state = {
    pending: false,
    data: {
        selectedOptions: null,
        dataSource: null
    },
    error: null
}, action) => {
    switch (action.type) {
        case economicActivitiesActionsConstants.FETCH_ECONOMIC_ACTIVITIES_BY_NAME:
            return {...state, pending: true};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_FETCHED:
            return {...state, pending: false, data: {...state.data, dataSource: action.economicActivities}};
        case economicActivitiesActionsConstants.PERMITTED_ECONOMIC_ACTIVITIES_SELECTED:
            return {...state, pending: false, data: {...state.data, selectedOptions: action.selectedOptions}};
        default:
            return state;
    }
};