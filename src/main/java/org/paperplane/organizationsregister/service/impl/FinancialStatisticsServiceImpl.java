package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.FinancialStatisticsRepository;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.FinancialStatisticsSearchCriteria;
import org.paperplane.organizationsregister.service.FinancialStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class FinancialStatisticsServiceImpl implements FinancialStatisticsService {
    private FinancialStatisticsRepository financialStatisticsRepository;

    @Autowired
    public FinancialStatisticsServiceImpl(FinancialStatisticsRepository financialStatisticsRepository) {
        this.financialStatisticsRepository = financialStatisticsRepository;
    }

    @Override
    public FinancialStatisticsByQuarter save(FinancialStatisticsByQuarter financialStatisticsByQuarter) {
        return financialStatisticsRepository.save(financialStatisticsByQuarter);
    }

    @Override
    public FinancialStatisticsByQuarter update(FinancialStatisticsByQuarter financialStatisticsByQuarter) {
        return financialStatisticsRepository.save(financialStatisticsByQuarter);
    }

    @Override
    public FinancialStatisticsByQuarter findById(int id) {
        return financialStatisticsRepository.findById(id);
    }

    @Override
    public List<FinancialStatisticsByQuarter> findAllByOrganizationAndYear(Organization organization, int year) {
        return financialStatisticsRepository.findAllByOrganizationAndYear(organization, year);
    }

    @Override
    public List<FinancialStatisticsByQuarter> findAllDebit() {
        return financialStatisticsRepository.findAllDebit();
    }

    @Override
    public FinancialStatisticsByQuarter findByOrganizationAndYearAndQuarter(Organization organization, int year, int quarter) {
        return financialStatisticsRepository.findByOrganizationAndYearAndQuarter(organization, year, quarter);
    }

    @Override
    public List<FinancialStatisticsByQuarter> findAllByOrganization(Organization organization) {
        return financialStatisticsRepository.findAllByOrganization(organization);
    }

    @Override
    public BigDecimal sumFinancesOfOrganizationWithinYear(Organization organization, int year) {
        return financialStatisticsRepository.sumFinancesOfOrganizationWithinYear(organization, year);
    }

    @Override
    public boolean existsByBId(Integer id) {
        return financialStatisticsRepository.existsById(id);
    }

    @Override
    public int findMaxYear() {
        return financialStatisticsRepository.findMaxYear();
    }

    @Override
    public int findMinYear() {
        return financialStatisticsRepository.findMinYear();
    }

    @Override
    public int findMaxYear(long organizationBin) {
        return financialStatisticsRepository.findMaxYear(organizationBin);
    }

    @Override
    public int findMinYear(long organizationBin) {
        return financialStatisticsRepository.findMinYear(organizationBin);
    }

    @Override
    public List<Integer> findYearsOfFinancialStatisticsOfOrganization(long organizationBin) {
        return financialStatisticsRepository.findYearsOfFinancialStatisticsOfOrganization(organizationBin);
    }

    @Override
    public List<FinancialStatisticsByQuarter> findByCriteria(FinancialStatisticsSearchCriteria searchCriteria) {
        return financialStatisticsRepository.findByCriteria(searchCriteria);
    }

    @Override
    public List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsForEachFinancialAccount() {
        return financialStatisticsRepository.getOverallSumOfFinancialStatisticsForEachFinancialAccount();
    }

    @Override
    public List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsOfFinancialAccount(int financialAccountID) {
        return financialStatisticsRepository.getOverallSumOfFinancialStatisticsOfFinancialAccount(financialAccountID);
    }
}