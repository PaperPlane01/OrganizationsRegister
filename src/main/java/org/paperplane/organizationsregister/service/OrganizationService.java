package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.search.OrganizationTypeSearchCriteria;

import java.util.List;

public interface OrganizationService {
    Organization save(Organization organization);
    Organization findByBin(long bin);
    OrganizationType findOrganizationTypeById(int id);
    List<Organization> findOrganizationsWithNameContains(String nameContains);
    List<OrganizationType> findOrganizationTypesWithNameContains(String nameContains);
    OrganizationType saveOrganizationType(OrganizationType organizationType);
    List<OrganizationType> findAllOrganizationTypes();
    List<OrganizationType> findOrganizationTypesByCriteria(OrganizationTypeSearchCriteria searchCriteria);
    List<Organization> findOrganizationsByCriteria(OrganizationSearchCriteria organizationSearchCriteria);
    Organization update(Organization organization);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin);
    List<BankAccount> findBankAccountsOfOrganization(Organization organization);
}
