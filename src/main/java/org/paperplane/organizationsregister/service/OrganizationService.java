package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface OrganizationService {
    Organization save(Organization organization);
    List<Organization> findAllByNumberOfEmployeesBetween(int start, int end);
    List<Organization> findAllByFullNameContains(String line);
    List<Organization> findOrganizationsWithRegistrationDateGreaterThan(Date date);
    List<Organization> findAll(Pageable pageRequest);
    Organization findByBin(long bin);
    OrganizationType findOrganizationTypeById(int id);
    List<Organization> findOrganizationsWithNameContains(String nameContains);
    List<OrganizationType> findOrganizationTypesWithNameContains(String nameContains);
    void saveOrganizationType(OrganizationType organizationType);
    List<OrganizationType> findAllOrganizationTypes();
    List<Organization> findOrganizationsByCriteria(OrganizationSearchCriteria organizationSearchCriteria);
    Organization update(Organization organization);
    void assertOrganizationExistByBin(long bin);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin);
    List<BankAccount> findBankAccountsOfOrganization(Organization organization);
}
