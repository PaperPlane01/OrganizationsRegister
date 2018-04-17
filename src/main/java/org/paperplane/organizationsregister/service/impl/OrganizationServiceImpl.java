package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.OrganizationNotFoundException;
import org.paperplane.organizationsregister.service.OrganizationService;
import org.paperplane.organizationsregister.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Transactional
@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private OrganizationTypeRepository organizationTypeRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Override
    public Organization save(Organization organization) {
        if (!organization.getPermittedEconomicActivities().contains(organization.getPrimaryEconomicActivity())) {
            organization.getPermittedEconomicActivities().add(organization.getPrimaryEconomicActivity());
        }

        return organizationRepository.save(organization);
    }

    @Override
    public List<Organization> findAllByNumberOfEmployeesBetween(int start, int end) {
        return organizationRepository.findAllByNumberOfEmployeesBetween(start, end);
    }

    @Override
    public List<Organization> findAllByFullNameContains(String line) {
        return organizationRepository.findAllByFullNameContains(line);
    }

    @Override
    public List<Organization> findOrganizationsWithRegistrationDateGreaterThan(Date date) {
        return organizationRepository.findAllByRegistrationDateGreaterThan(date);
    }

    @Override
    public List<Organization> findAll(Pageable pageRequest) {
        return organizationRepository.findAllBy(pageRequest);
    }

    @Override
    public Organization findByBin(long bin) {
        return organizationRepository.findByBin(bin);
    }

    @Override
    public OrganizationType findOrganizationTypeById(int id) {
        return organizationTypeRepository.findById(id);
    }

    @Override
    public List<Organization> findOrganizationsWithNameContains(String nameContains) {
        List<Organization> organizations = organizationRepository.findAllByFullNameContains(nameContains);

        organizationRepository.findAllByShortNameContains(nameContains).forEach(organization -> {
            if (!organizations.contains(organization)) {
                organizations.add(organization);
            }
        });

        return organizations;
    }

    @Override
    public List<OrganizationType> findOrganizationTypesWithNameContains(String nameContains) {
        return organizationTypeRepository.findAllByNameContains(nameContains);
    }

    @Override
    public void saveOrganizationType(OrganizationType organizationType) {
        organizationTypeRepository.save(organizationType);
    }

    @Override
    public List<OrganizationType> findAllOrganizationTypes() {
        return organizationTypeRepository.findAll();
    }

    @Override
    public List<Organization> findOrganizationsByCriteria(OrganizationSearchCriteria organizationSearchCriteria) {
        return organizationRepository.findByCriteria(organizationSearchCriteria);
    }

    @Override
    public Organization update(Organization organization) {
        return organizationRepository.update(organization);
    }

    @Override
    public void assertOrganizationExistByBin(long bin) {
        Organization organization = organizationRepository.findByBin(bin);
        if (organization == null) {
            throw new OrganizationNotFoundException();
        }
    }

    @Override
    public int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin) {
        return organizationRepository.findNumberOfYearsSinceOrganizationHasBeenRegistered(bin);
    }

    @Override
    public List<BankAccount> findBankAccountsOfOrganization(Organization organization) {
        return bankAccountRepository.findAllByOrganization(organization);
    }
}