package org.paperplane.organizationsregister.data.impl;

import com.google.common.collect.Iterables;
import org.paperplane.organizationsregister.data.custom.FinancialStatisticsCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.FinancialStatisticsSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Transactional
@Repository
public class FinancialStatisticsRepositoryImpl implements FinancialStatisticsCustomQueriesCaller {
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    public FinancialStatisticsRepositoryImpl(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public List<FinancialStatisticsByQuarter> findAllDebit() {
        StoredProcedureQuery query = entityManagerFactory
                .createEntityManager().createStoredProcedureQuery("findAllDebit");
        query.execute();
        return (List<FinancialStatisticsByQuarter>) query.getResultList();
    }

    @Override
    public List<FinancialStatisticsByQuarter> findAllByOrganizationAndQuarter(Organization organization, int quarter) {
        StoredProcedureQuery query = entityManagerFactory.createEntityManager()
                .createStoredProcedureQuery("findFinancialStatisticsByOrganizationAndQuarter")
                .setParameter("organizationBIN", organization.getBin())
                .setParameter("quarter", quarter);
        query.execute();
        return (List<FinancialStatisticsByQuarter>) query.getResultList();
    }

    @Override
    public BigDecimal sumFinancesOfOrganizationWithinYear(Organization organization, int year) {
        Query query = entityManagerFactory.createEntityManager()
                .createNativeQuery("SELECT sum(sum) AS overallSum " +
                        "from FinancialStatistics " +
                        "WHERE organizationBIN = :organizationBIN AND year = :year " +
                        "GROUP BY organizationBIN")
                .setParameter("organizationBIN", organization.getBin())
                .setParameter("year", year);
        return (BigDecimal) query.getSingleResult();
    }

    @Override
    public List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsForEachFinancialAccount() {
        Query query = entityManagerFactory.createEntityManager()
                .createQuery("select new map(financialStatisticsByQuarter.financialAccount as financialAccount, " +
                "sum(financialStatisticsByQuarter.sum) as overallSum) " +
                "from FinancialStatisticsByQuarter financialStatisticsByQuarter " +
                "group by financialStatisticsByQuarter.financialAccount");
        return (List<Map<FinancialAccount, BigDecimal>>) query.getResultList();
    }

    @Override
    public List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsOfFinancialAccount(int financialAccountID) {
        Query query = entityManagerFactory.createEntityManager()
                .createQuery("select new map(financialStatisticsByQuarter.financialAccount as financialAccount, " +
                        "sum(financialStatisticsByQuarter.sum) as overallSum) " +
                        "from FinancialStatisticsByQuarter financialStatisticsByQuarter " +
                        "where financialStatisticsByQuarter.financialAccount.id = :financialAccountID " +
                        "group by financialStatisticsByQuarter.financialAccount")
                .setParameter("financialAccountID", financialAccountID);
        return (List<Map<FinancialAccount, BigDecimal>>) query.getResultList();
    }

    @Override
    public List<FinancialStatisticsByQuarter> findByCriteria(FinancialStatisticsSearchCriteria searchCriteria) {
        CriteriaBuilder criteriaBuilder = entityManagerFactory.getCriteriaBuilder();
        CriteriaQuery<FinancialStatisticsByQuarter> criteriaQuery = criteriaBuilder.createQuery(FinancialStatisticsByQuarter.class);
        Root<FinancialStatisticsByQuarter> root = criteriaQuery.from(FinancialStatisticsByQuarter.class);

        List<Predicate> predicates = new ArrayList<>();

        if (searchCriteria.getId() != null) {
            predicates.add(criteriaBuilder.equal(root.get("id"), searchCriteria.getId()));
        }

        if (searchCriteria.getAttribute() != null && !searchCriteria.getAttribute().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("attribute"), searchCriteria.getAttribute()));
        }

        if (searchCriteria.getFinancialAccount() != null) {
            predicates.add(criteriaBuilder.equal(root.get("financialAccount"), searchCriteria.getFinancialAccount()));
        }

        if (searchCriteria.getOrganization() != null) {
            predicates.add(criteriaBuilder.equal(root.get("organization"), searchCriteria.getOrganization()));
        }

        if (searchCriteria.getMinSum() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sum"), searchCriteria.getMinSum()));
        }

        if (searchCriteria.getMaxSum() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sum"), searchCriteria.getMaxSum()));
        }

        if (searchCriteria.getQuarter() != null) {
            predicates.add(criteriaBuilder.equal(root.get("quarter"), searchCriteria.getQuarter()));
        }

        if (searchCriteria.getMinYear() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("year"), searchCriteria.getMinYear()));
        }

        if (searchCriteria.getMaxYear() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("year"), searchCriteria.getMaxYear()));
        }

        if (searchCriteria.getAttribute() != null && !searchCriteria.getAttribute().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get("attribute"), searchCriteria.getAttribute()));
        }

        criteriaQuery.where(Iterables.toArray(predicates, Predicate.class));

        return entityManagerFactory.createEntityManager().createQuery(criteriaQuery).getResultList();
    }
}
