package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class BankRepositoryImpl implements BankCustomQueriesCaller {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Override
    public List<Bank> findByCriteria(BankSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<Bank> criteriaQuery = criteriaBuilder.createQuery(Bank.class);
        Root<Bank> root = criteriaQuery.from(Bank.class);

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
