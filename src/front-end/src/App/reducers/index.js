import { combineReducers } from 'redux';
import {permittedEconomicActivitiesSelectReducer,
    primaryEconomicActivitySelectReducer
} from "./economic-activities-reducers";
import {taxesCommitteesSelectReducer} from "./taxes-committees-reducer";
import {organizationTypeSelectReducer} from "./organizations-types-reducers";
import {organizationSearchReducer, organizationValidationReducer} from "./organizations-reducers.js";
import {currentUserReducer} from "./user-reducer";
import {routerReducer} from 'react-router-redux';
import {
    organizationAddingPageReducer, organizationPageReducer, organizationSelectReducer
} from "./organizations-reducers";
import {
    financialStatisticsSearchReducer, quarterSelectReducer,
    yearSelectReducer
} from "./financial-statistics-reducers";

export default combineReducers({
    organizationsSearch: combineReducers({
        searchedOrganizations: organizationSearchReducer,
        taxesCommitteeSelect: taxesCommitteesSelectReducer,
        economicActivitiesSelect: permittedEconomicActivitiesSelectReducer,
        organizationTypeSelect: organizationTypeSelectReducer,
        validation: organizationValidationReducer
    }),
    organizationAdding: combineReducers({
       organizationAddingInformation: organizationAddingPageReducer,
       taxesCommitteeSelect: taxesCommitteesSelectReducer,
       primaryEconomicActivitySelect: primaryEconomicActivitySelectReducer,
       permittedEconomicActivitiesSelect: permittedEconomicActivitiesSelectReducer,
       organizationTypeSelect: organizationTypeSelectReducer,
       validation: organizationValidationReducer
    }),
    financialStatisticsSearch: combineReducers({
       organizationSelect: organizationSelectReducer,
       financialStatistics: financialStatisticsSearchReducer,
       yearSelect: yearSelectReducer,
       quarterSelect: quarterSelectReducer
    }),
    organizationPage: combineReducers({
       organizationData: organizationPageReducer,
       financialStatistics: financialStatisticsSearchReducer
    }),
    routing: routerReducer,
    userData: currentUserReducer
});