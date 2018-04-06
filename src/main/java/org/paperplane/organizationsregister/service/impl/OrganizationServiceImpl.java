package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.EconomicActivity;
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
    private EconomicActivityRepository economicActivityRepository;

    @Autowired
    private FinancialAccountRepository financialAccountRepository;

    @Autowired
    private TaxesCommitteeRepository taxesCommitteeRepository;

    @Override
    //TODO
    public Organization save(Organization organization) {
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
        organizations.addAll(organizationRepository.findAllByShortNameContains(nameContains));
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
}