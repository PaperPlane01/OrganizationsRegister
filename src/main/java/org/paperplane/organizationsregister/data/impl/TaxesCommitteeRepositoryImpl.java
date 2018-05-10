package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.TaxesCommitteeCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Repository
public class TaxesCommitteeRepositoryImpl implements TaxesCommitteeCustomQueriesCaller {
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<TaxesCommittee> findByCriteria(TaxesCommitteeSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<TaxesCommittee> criteriaQuery = criteriaBuilder.createQuery(TaxesCommittee.class);
        Root<TaxesCommittee> root = criteriaQuery.from(TaxesCommittee.class);

        List<Predicate> predicates = new ArrayList<>();

        if (searchCriteria.getName() != null && !searchCriteria.getName().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("name"), "%".concat(searchCriteria.getName()).concat("%")));
        }

        if (searchCriteria.getAddress() != null && !searchCriteria.getAddress().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("address"), "%".concat(searchCriteria.getAddress()).concat("%")));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }
}