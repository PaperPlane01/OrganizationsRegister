package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigDecimal;
import java.util.List;

public interface FinancialStatisticsService {
    FinancialStatisticsByQuarter save(FinancialStatisticsByQuarter financialStatisticsByQuarter);
    List<FinancialStatisticsByQuarter> findAllByOrganizationAndYear(Organization organization, int year);
    List<FinancialStatisticsByQuarter> findAllDebit();
    FinancialStatisticsByQuarter findByOrganizationAndYearAndQuarter(Organization organization, int year, byte quarter);
    List<FinancialStatisticsByQuarter> findAllByOrganization(Organization organization);
    BigDecimal sumFinancesOfOrganizationWithinYear(Organization organization, int year);
    boolean existsByBId(Integer id);
    int findMaxYear();
    int findMinYear();
    int findMaxYear(long organizationBin);
    int findMinYear(long organizationBin);
    List<Integer> findYearsOfFinancialStatisticsOfOrganization(long organizationBin);
}
