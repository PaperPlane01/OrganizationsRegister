package org.paperplane.organizationsregister.web;

import org.jboss.logging.Param;
import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;
import org.paperplane.organizationsregister.domain.search.FinancialStatisticsSearchCriteria;
import org.paperplane.organizationsregister.service.FinancialStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/api/financial-statistics-by-quarters")
public class FinancialStatisticsByQuarterController {

    private FinancialStatisticsService financialStatisticsService;

    @Autowired
    public FinancialStatisticsByQuarterController(FinancialStatisticsService financialStatisticsService) {
        this.financialStatisticsService = financialStatisticsService;
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"bin"})
    @ResponseBody
    public List<FinancialStatisticsByQuarter> getFinancialStatisticsOfOrganization(
            @RequestParam("bin")
            @EntityIdentifier(entityClass = Organization.class) long bin) {
        Organization organization = new Organization();
        organization.setBin(bin);
        return financialStatisticsService.findAllByOrganization(organization);
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"bin", "year"})
    @ResponseBody
    public List<FinancialStatisticsByQuarter> getFinancialStatisticsOfOrganizationByYear(
            @RequestParam("bin") @EntityIdentifier(entityClass = Organization.class) long bin, @RequestParam(value = "year") int year) {
        return financialStatisticsService.findAllByOrganizationAndYear(new Organization(bin), year);
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"bin", "year", "quarter"})
    @ResponseBody
    public List<FinancialStatisticsByQuarter> getFinancialStatisticsOfOrganizationByQuarterAndYear(
            @RequestParam("bin") @EntityIdentifier(entityClass = Organization.class) long bin, @RequestParam("year") int year,
            @RequestParam("quarter") byte quarter) {
        return Collections.singletonList(financialStatisticsService
                .findByOrganizationAndYearAndQuarter(new Organization(bin), year, quarter));
    }

    @RequestMapping(method = RequestMethod.GET, params = {"action=getMaxYear"})
    @ResponseBody
    public int getMaxYearOfFinancialStatistics() {
        return financialStatisticsService.findMaxYear();
    }

    @RequestMapping(method = RequestMethod.GET, params = {"action=getMinYear"})
    @ResponseBody
    public int getMinYearOfFinancialStatistics() {
        return financialStatisticsService.findMinYear();
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"action=getMaxYear", "bin"})
    @ResponseBody
    public int getMaxYearOfFinancialStatistics(@RequestParam("bin") @EntityIdentifier(entityClass = Organization.class)
                                                       long organizationBin) {
        return financialStatisticsService.findMaxYear(organizationBin);
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"action=getMinYear", "bin"})
    @ResponseBody
    public int getMinYearOfFinancialStatistics(@RequestParam("bin")
                                               @EntityIdentifier(entityClass = Organization.class) long organizationBin) {
        return financialStatisticsService.findMinYear(organizationBin);
    }

    @RequestMapping(method = RequestMethod.POST, headers = {"token"})
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public FinancialStatisticsByQuarter save(@RequestBody FinancialStatisticsByQuarter financialStatisticsByQuarter,
                               @RequestHeader(value = "token", required = false) String tokenValue) {
        return financialStatisticsService.save(financialStatisticsByQuarter);
    }

    @AssertEntityExists
    @RequestMapping(value = "/years", method = RequestMethod.GET, params = {"bin"})
    @ResponseBody
    public List<Integer> findYearsOfFinancialStatisticsOfOrganization(
            @RequestParam("bin")
            @EntityIdentifier(entityClass = Organization.class) long organizationBin) {
        return financialStatisticsService.findYearsOfFinancialStatisticsOfOrganization(organizationBin);
    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public List<FinancialStatisticsByQuarter> findByCriteria(@RequestBody FinancialStatisticsSearchCriteria searchCriteria) {
        return  financialStatisticsService.findByCriteria(searchCriteria);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public FinancialStatisticsByQuarter findById(@EntityIdentifier(entityClass = FinancialStatisticsByQuarter.class)
                                                 @PathVariable("id") int id) {
        return financialStatisticsService.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/overall-sum-by-financial-accounts")
    @ResponseBody
    public List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsForEachFinancialAccount() {
        return financialStatisticsService.getOverallSumOfFinancialStatisticsForEachFinancialAccount();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/overall-sum-by-financial-accounts", params = {"financialAccountID"})
    @ResponseBody
    public List<Map<FinancialAccount, BigDecimal>> getOverallSumOfFinancialStatisticsByFinancialAccount(
            @RequestParam("financialAccountID") int financialAccountID) {
        return financialStatisticsService.getOverallSumOfFinancialStatisticsOfFinancialAccount(financialAccountID);
    }
}