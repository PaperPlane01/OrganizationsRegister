import {economicActivitiesActionsConstants} from "../constants/action-constants";

export const economicActivitiesReducer = (state = {
    pending: false,
    payload: {data: {}},
    error: null
}, action) => {
    if (action === undefined) {
        return state;
    }

    switch (action.type) {
        case economicActivitiesActionsConstants.LOAD_ECONOMIC_ACTIVITIES_BY_NAME:
            return {...state, pending:true, payload: {data: {}}, error: null};
        case economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_LOADING_SUCCESS:
            return {...state, pending: false, payload: {
                data: {
                    ...state.payload.data,
                    loadedEconomicActivities: action.economicActivities
                }
            }, error: null};
        case economicActivitiesActionsConstants.SELECT_SINGLE_ECONOMIC_ACTIVITY:
            return {...state, pending: false, payload: {
                data: {
                    ...state.payload.data,
                    selectedEconomicActivityOption: action.selectedEconomicActivityOption
                }
            }, error: null};
        case economicActivitiesActionsConstants.SELECT_MULTIPLE_ECONOMIC_ACTIVITIES:
            return {...state, pending: false, payload: {
                data: {
                    ...state.payload.data,
                    selectedEconomicActivitiesOptions: action.selectedEconomicActivitiesOptions
                }
            }, error: null};
        default:
            return state;
    }
};