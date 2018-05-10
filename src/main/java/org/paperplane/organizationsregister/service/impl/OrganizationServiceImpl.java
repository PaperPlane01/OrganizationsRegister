package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.domain.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.search.OrganizationTypeSearchCriteria;
import org.paperplane.organizationsregister.exception.OrganizationAlreadyExistsException;
import org.paperplane.organizationsregister.service.OrganizationService;
import org.paperplane.organizationsregister.data.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

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
        if (organizationRepository.existsById(organization.getBin())) {
            throw new OrganizationAlreadyExistsException();
        }

        if (!organization.getPermittedEconomicActivities().contains(organization.getPrimaryEconomicActivity())) {
            organization.getPermittedEconomicActivities().add(organization.getPrimaryEconomicActivity());
        }

        return organizationRepository.save(organization);
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
    public OrganizationType saveOrganizationType(OrganizationType organizationType) {
        return organizationTypeRepository.save(organizationType);
    }

    @Override
    public List<OrganizationType> findAllOrganizationTypes() {
        return organizationTypeRepository.findAll();
    }

    @Override
    public List<OrganizationType> findOrganizationTypesByCriteria(OrganizationTypeSearchCriteria searchCriteria) {
        return organizationTypeRepository.findByCriteria(searchCriteria);
    }

    @Override
    public List<Organization> findOrganizationsByCriteria(OrganizationSearchCriteria organizationSearchCriteria) {
        return organizationRepository.findByCriteria(organizationSearchCriteria);
    }

    @Override
    public Organization update(Organization organization) {
        if (organization.getPermittedEconomicActivities() == null) {
            organization.setPermittedEconomicActivities(Collections.singletonList(organization.getPrimaryEconomicActivity()));
        }

        if (!organization.getPermittedEconomicActivities().contains(organization.getPrimaryEconomicActivity())) {
            organization.getPermittedEconomicActivities().add(organization.getPrimaryEconomicActivity());
        }

        return organizationRepository.save(organization);
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