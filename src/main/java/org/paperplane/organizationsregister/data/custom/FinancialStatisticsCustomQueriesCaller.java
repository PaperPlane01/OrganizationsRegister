package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.FinancialStatisticsSearchCriteria;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface FinancialStatisticsCustomQueriesCaller {
    List<FinancialStatisticsByQuarter> findAllDebit();
    List<FinancialStatisticsByQuarter> findAllByOrganizationAndQuarter(Organization organization, int quarter);
    BigDecimal sumFinancesOfOrganizationWithinYear(Organization organization, int year);
    List<FinancialStatisticsByQuarter> findByCriteria(FinancialStatisticsSearchCriteria searchCriteria);
    List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsForEachFinancialAccount();
    List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsOfFinancialAccount(int financialAccountID);
}
