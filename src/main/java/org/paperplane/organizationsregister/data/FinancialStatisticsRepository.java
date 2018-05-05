package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.FinancialStatisticsCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface FinancialStatisticsRepository extends JpaRepository<FinancialStatisticsByQuarter, Integer>,
        FinancialStatisticsCustomQueriesCaller {
    FinancialStatisticsByQuarter save(FinancialStatisticsByQuarter financialStatisticsByQuarter);
    FinancialStatisticsByQuarter findById(int id);
    List<FinancialStatisticsByQuarter> findAllByOrganizationAndYear(Organization organization, int year);
    List<FinancialStatisticsByQuarter> findAllDebit();
    FinancialStatisticsByQuarter findByOrganizationAndYearAndQuarter(Organization organization, int year, byte quarter);
    BigDecimal sumFinancesOfOrganizationWithinYear(Organization organization, int year);
    List<FinancialStatisticsByQuarter> findAllByOrganization(Organization organization);
    boolean existsById(Integer id);

    @Query("select max(year) from FinancialStatisticsByQuarter ")
    int findMaxYear();

    @Query("select min(year) from FinancialStatisticsByQuarter ")
    int findMinYear();

    @Query("select max(year) from FinancialStatisticsByQuarter where organization.bin = :#{#bin}")
    int findMaxYear(@Param("bin") long bin);

    @Query("select min(year) from FinancialStatisticsByQuarter where organization.bin = :#{#bin}")
    int findMinYear(@Param("bin") long bin);

    @Query("select distinct year from FinancialStatisticsByQuarter where organization.bin = :#{#bin}")
    List<Integer> findYearsOfFinancialStatisticsOfOrganization(@Param("bin") long bin);
}
