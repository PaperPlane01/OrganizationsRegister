import { combineReducers } from 'redux';
import {
    economicActivitiesSearchReducer, economicActivityValidationReducer, permittedEconomicActivitiesSelectReducer,
    primaryEconomicActivitySelectReducer
} from "./economic-activities-reducers";
import {
    taxesCommitteePageReducer,
    taxesCommitteesSearchRecuder, taxesCommitteesSelectReducer,
    taxesCommitteesValidationReducer
} from "./taxes-committees-reducer";
import {organizationTypeSelectReducer} from "./organizations-types-reducers";
import {organizationSearchReducer, organizationValidationReducer} from "./organizations-reducers.js";
import {currentUserReducer} from "./user-reducer";
import {routerReducer} from 'react-router-redux';
import {
    organizationAddingPageReducer, organizationPageReducer, organizationSelectReducer, organizationUpdateReducer
} from "./organizations-reducers";
import {
    financialStatisticsSearchReducer, quarterSelectReducer,
    yearSelectReducer
} from "./financial-statistics-reducers";
import {bankPageReducer, bankSelectReducer, banksSearchReducer, bankValidationReducer} from "./banks-reducers";

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
    organizationUpdate: combineReducers({
        organizationUpdateInformation: organizationUpdateReducer,
        primaryEconomicActivitySelect: primaryEconomicActivitySelectReducer,
        permittedEconomicActivitiesSelect: permittedEconomicActivitiesSelectReducer,
        organizationTypeSelect: organizationTypeSelectReducer,
        taxesCommitteeSelect: taxesCommitteesSelectReducer,
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
    }),
    bankAccountsSearchPage: combineReducers({
       organizationSelect: organizationSelectReducer,
       bankSelect: bankSelectReducer 
    }),
    taxesCommitteesSearchPage: combineReducers({
       taxesCommitteesSearch: taxesCommitteesSearchRecuder,
       validation: taxesCommitteesValidationReducer
    }),
    taxesCommitteePage: taxesCommitteePageReducer,
    banksSearchPage: combineReducers({
        banksSearch: banksSearchReducer,
        validation: bankValidationReducer
    }),
    economicActivitiesSearchPage: combineReducers({
        economicActivitiesSearch: economicActivitiesSearchReducer,
        validation: economicActivityValidationReducer
    }),
    bankPage: bankPageReducer,
    routing: routerReducer,
    userData: currentUserReducer
});