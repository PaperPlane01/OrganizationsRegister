package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.OrganizationCustomQueriesCaller;
import org.paperplane.organizationsregister.data.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManagerFactory;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Repository
public class OrganizationRepositoryImpl implements OrganizationCustomQueriesCaller {
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    public OrganizationRepositoryImpl(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public int findNumberOfYearsSinceOrganizationHasBeenRegistered(Organization organization) {
        return findNumberOfYearsSinceOrganizationHasBeenRegistered(organization.getBin());
    }

    @Override
    public int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin) {
        StoredProcedureQuery query = entityManagerFactory.createEntityManager()
                .createNamedStoredProcedureQuery("findNumberOfYearsSinceOrganizationHasBeenRegistered")
                .setParameter("organizationBIN", bin);
        query.execute();

        return (Integer) query.getOutputParameterValue("numberOfYears");
    }

    @Override
    public List<Organization> findByCriteria(OrganizationSearchCriteria organizationSearchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<Organization> criteriaQuery = criteriaBuilder.createQuery(Organization.class);
        Root<Organization> root = criteriaQuery.from(Organization.class);

        List<Predicate> predicates = new ArrayList<>();

        if (organizationSearchCriteria.getBin() != null) {
            predicates.add(criteriaBuilder.equal(root.get("bin"), organizationSearchCriteria.getBin()));
        }

        if (organizationSearchCriteria.getFounder() != null && !organizationSearchCriteria.getFounder().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("founder"), "%" +organizationSearchCriteria.getFounder() + "%"));
        }

        if (organizationSearchCriteria.getFullName() != null && !organizationSearchCriteria.getFullName().isEmpty()) {
            System.out.println(organizationSearchCriteria.getFullName());
            predicates.add(criteriaBuilder.like(root.get("fullName").as(String.class), "%" + organizationSearchCriteria.getFullName().toLowerCase() + "%"));
        }

        if (organizationSearchCriteria.getShortName() != null && !organizationSearchCriteria.getShortName().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("shortName"), "%" + organizationSearchCriteria.getShortName() +"%"));
        }

        if (organizationSearchCriteria.getMinNumberOfEmployees() != null) {
            predicates.add(criteriaBuilder.gt(root.get("numberOfEmployees"),
                    organizationSearchCriteria.getMinNumberOfEmployees()));
        }

        if (organizationSearchCriteria.getMaxNumberOfEmployees() != null) {
            predicates.add(criteriaBuilder.lt(root.get("numberOfEmployees"),
                    organizationSearchCriteria.getMaxNumberOfEmployees()));
        }

        if (organizationSearchCriteria.getOrganizationType() != null) {
            predicates.add(criteriaBuilder.equal(root.get("organizationType"),
                    organizationSearchCriteria.getOrganizationType()));
        }

        if (organizationSearchCriteria.getTaxesCommittee() != null) {
            predicates.add(criteriaBuilder.equal(root.get("taxesCommittee"),
                    organizationSearchCriteria.getTaxesCommittee()));
        }

        if (organizationSearchCriteria.getPrimaryEconomicActivity() != null) {
            predicates.add(criteriaBuilder.equal(root.get("primaryEconomicActivity"),
                    organizationSearchCriteria.getPrimaryEconomicActivity()));
        }

        if (organizationSearchCriteria.getPermittedEconomicActivities() != null &&
                !organizationSearchCriteria.getPermittedEconomicActivities().isEmpty()) {

            organizationSearchCriteria.getPermittedEconomicActivities().forEach(economicActivity ->
                    predicates.add(criteriaBuilder.isMember(economicActivity, root.get("permittedEconomicActivities"))));
        }

        if (organizationSearchCriteria.getRegistrationDate() != null) {
            predicates.add(criteriaBuilder.equal(root.get("registrationDate"),
                    organizationSearchCriteria.getRegistrationDate()));
        }

        if (organizationSearchCriteria.getMaxRegistrationDate() != null) {
            predicates.add(criteriaBuilder.lessThan(root.get("registrationDate"),
                    organizationSearchCriteria.getMaxRegistrationDate()));
        }

        if (organizationSearchCriteria.getMinRegistrationDate() != null) {
            predicates.add(criteriaBuilder.greaterThan(root.get("registrationDate"),
                    organizationSearchCriteria.getMinRegistrationDate()));
        }

        if (organizationSearchCriteria.getAddress() != null && !organizationSearchCriteria.getAddress().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("address"), "%" + organizationSearchCriteria.getAddress() +"%"));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }

    @Override
    public Organization update(Organization organization) {
        return merge(organization);
    }

    private Organization merge(Organization organization) {
        return entityManagerFactory.createEntityManager().merge(organization);
    }
}