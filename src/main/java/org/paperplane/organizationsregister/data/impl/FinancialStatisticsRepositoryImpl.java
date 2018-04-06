package org.paperplane.organizationsregister.data.impl;

import org.paperplane.organizationsregister.data.custom.FinancialStatisticsCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;

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
    public List<FinancialStatisticsByQuarter> findAllByOrganizationAndQuarter(Organization organization, byte quarter) {
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
}
