package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.Organization;
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
    public List<Organization> findOrganizationsServedByBank(Bank bank) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<Organization> criteriaQuery = criteriaBuilder.createQuery(Organization.class);
        Root<Organization> root = criteriaQuery.from(Organization.class);
        root.join("bankAccount").alias("bankAccount");

        criteriaQuery.select(root).where(criteriaBuilder.equal(root.get("bankAccount.bank"), bank));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }

    @Override
    public List<Bank> findByCriteria(BankSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<Bank> criteriaQuery = criteriaBuilder.createQuery(Bank.class);
        Root<Bank> root = criteriaQuery.from(Bank.class);

        List<Predicate> predicates = new ArrayList<>();

        if (searchCriteria.getName() != null && !searchCriteria.getName().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("name"), "%".concat(searchCriteria.getName()).concat("%")));
        }

        if (searchCriteria.getAddress() != null && !searchCriteria.getAddress().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("address"), "%".concat(searchCriteria.getAddress()).concat("%")));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }
}
