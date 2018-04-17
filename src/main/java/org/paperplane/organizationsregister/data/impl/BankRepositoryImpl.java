package org.paperplane.organizationsregister.data.impl;

import org.aspectj.weaver.ast.Or;
import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
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
}
