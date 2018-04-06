import {economicActivitiesActionsConstants} from "../constants/action-constants";
import {API_URL, ECONOMIC_ACTIVITIES} from "../constants/api-constants";
import axios from 'axios';

export const economicActivitiesLoaded = (economicActivities) => {
    return {
        type: economicActivitiesActionsConstants.ECONOMIC_ACTIVITIES_LOADING_SUCCESS,
        economicActivities: economicActivities
    }
};

export const multipleEconomicActivitiesSelected = (economicActivitiesOptions) => {
    console.log(economicActivitiesOptions)
    return {
        type: economicActivitiesActionsConstants.SELECT_MULTIPLE_ECONOMIC_ACTIVITIES,
        selectedEconomicActivitiesOptions: economicActivitiesOptions
    }
};

export const singleEconomicActivitySelected = (option) => {
    return {
        type: economicActivitiesActionsConstants.SELECT_SINGLE_ECONOMIC_ACTIVITY,
        selectedEconomicActivityOption: option
    }
};

export const loadEconomicActivitiesWithNameContains = (nameContains) => {

    return (dispatch) => {
        if (nameContains === '') {
            dispatch(economicActivitiesLoaded([]));
            return;
        }

        axios.get(API_URL.concat(ECONOMIC_ACTIVITIES), {params: {
            nameContains: nameContains
        }}).then(response => {
            dispatch(economicActivitiesLoaded(response.data));
        })
    }
};

export const handleMultipleEconomicActivitiesSelect = (economicActivitiesOptions) => {
    return (dispatch) => {
        dispatch(multipleEconomicActivitiesSelected(economicActivitiesOptions));
    }
};

export const handleSingleEconomicActivitySelect = (option) => {
    return (dispatch) => {
        dispatch(singleEconomicActivitySelected(option))
    }
};