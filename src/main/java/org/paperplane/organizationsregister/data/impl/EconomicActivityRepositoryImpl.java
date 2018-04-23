package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.EconomicActivityCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.search.EconomicActivitySearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class EconomicActivityRepositoryImpl implements EconomicActivityCustomQueriesCaller {
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<EconomicActivity> findByCriteria(EconomicActivitySearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<EconomicActivity> criteriaQuery = criteriaBuilder.createQuery(EconomicActivity.class);
        Root<EconomicActivity> root = criteriaQuery.from(EconomicActivity.class);
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
