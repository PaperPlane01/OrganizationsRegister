package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.FinancialAccountCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;
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

@Repository
@Transactional
public class FinancialAccountRepositoryImpl implements FinancialAccountCustomQueriesCaller {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<FinancialAccount> findByCriteria(FinancialAccountSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<FinancialAccount> criteriaQuery = criteriaBuilder.createQuery(FinancialAccount.class);
        Root<FinancialAccount> root = criteriaQuery.from(FinancialAccount.class);
        List<Predicate> predicates = new ArrayList<>();

        if (searchCriteria.getId() != null) {
            predicates.add(criteriaBuilder.equal(root.get("id"), searchCriteria.getId()));
        }

        if (searchCriteria.getName() != null && !searchCriteria.getName().isEmpty()) {
            predicates.add(criteriaBuilder.like(root.get("name"), "%".concat(searchCriteria.getName()).concat("%")));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }
}