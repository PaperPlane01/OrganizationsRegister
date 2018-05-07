package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.FinancialStatisticsSearchCriteria;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface FinancialStatisticsService {
    FinancialStatisticsByQuarter save(FinancialStatisticsByQuarter financialStatisticsByQuarter);
    FinancialStatisticsByQuarter update(FinancialStatisticsByQuarter financialStatisticsByQuarter);
    FinancialStatisticsByQuarter findById(int id);
    List<FinancialStatisticsByQuarter> findAllByOrganizationAndYear(Organization organization, int year);
    List<FinancialStatisticsByQuarter> findAllDebit();
    FinancialStatisticsByQuarter findByOrganizationAndYearAndQuarter(Organization organization, int year, int quarter);
    List<FinancialStatisticsByQuarter> findAllByOrganization(Organization organization);
    BigDecimal sumFinancesOfOrganizationWithinYear(Organization organization, int year);
    boolean existsByBId(Integer id);
    int findMaxYear();
    int findMinYear();
    int findMaxYear(long organizationBin);
    int findMinYear(long organizationBin);
    List<Integer> findYearsOfFinancialStatisticsOfOrganization(long organizationBin);
    List<FinancialStatisticsByQuarter> findByCriteria(FinancialStatisticsSearchCriteria searchCriteria);
    List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsForEachFinancialAccount();
    List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsOfFinancialAccount(int financialAccountID);
}
