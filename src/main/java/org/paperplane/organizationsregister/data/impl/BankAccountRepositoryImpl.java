package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.BankAccountCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.search.BankAccountSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BankAccountRepositoryImpl implements BankAccountCustomQueriesCaller {
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<BankAccount> findByCriteria(BankAccountSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<BankAccount> criteriaQuery = criteriaBuilder.createQuery(BankAccount.class);
        Root<BankAccount> root = criteriaQuery.from(BankAccount.class);
        List<Predicate> predicates = new ArrayList<>();

        if (searchCriteria.getId() != null) {
            predicates.add(criteriaBuilder.equal(root.get("id"), searchCriteria.getId()));
        }

        if (searchCriteria.getBank() != null) {
            predicates.add(criteriaBuilder.equal(root.get("bank"), searchCriteria.getBank()));
        }

        if (searchCriteria.getOrganization() != null) {
            predicates.add(criteriaBuilder.equal(root.get("organization"), searchCriteria.getOrganization()));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }
}
