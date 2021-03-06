package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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

    @Override
    public List<Map<Organization, Bank>> findBanksByOrganizationRegistrationDate(Date registrationDate) {
        Query query = entityManagerFactory.createEntityManager()
                .createQuery("select new map(organization as organization, bankAccount.bank as bank) " +
                        "from Organization organization " +
                        "inner join BankAccount bankAccount " +
                        "on bankAccount.organization = organization " +
                        "where organization.registrationDate = :registrationDate")
                .setParameter("registrationDate", registrationDate);
        return (List<Map<Organization, Bank>>) query.getResultList();
    }
}
