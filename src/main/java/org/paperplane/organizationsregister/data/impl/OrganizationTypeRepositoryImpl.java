package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.aspectj.weaver.ast.Or;
import org.paperplane.organizationsregister.data.custom.OrganizationTypeCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.search.OrganizationTypeSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class OrganizationTypeRepositoryImpl implements OrganizationTypeCustomQueriesCaller {
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<OrganizationType> findByCriteria(OrganizationTypeSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<OrganizationType> criteriaQuery = criteriaBuilder.createQuery(OrganizationType.class);
        Root<OrganizationType> root = criteriaQuery.from(OrganizationType.class);

        List<Predicate> predicates = new ArrayList<>();

        if (searchCriteria.getId() != null) {
            predicates.add(criteriaBuilder.equal(root.get("id"), searchCriteria.getId()));
        }

        if (searchCriteria.getName() != null) {
            predicates.add(criteriaBuilder.like(root.get("name"), "%".concat(searchCriteria.getName()).concat("%")));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }
}
