package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExistsById;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.FinancialStatisticsByQuarter;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.service.FinancialStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/financial-statistics-by-quarters")
public class FinancialStatisticsByQuarterController {

    private FinancialStatisticsService financialStatisticsService;

    @Autowired
    public FinancialStatisticsByQuarterController(FinancialStatisticsService financialStatisticsService) {
        this.financialStatisticsService = financialStatisticsService;
    }

    @AssertEntityExistsById(entityClass = Organization.class)
    @RequestMapping(method = RequestMethod.GET, params = {"bin"})
    @ResponseBody
    public List<FinancialStatisticsByQuarter> getFinancialStatisticsOfOrganization(@RequestParam("bin") @EntityIdentifier long bin) {
        Organization organization = new Organization();
        organization.setBin(bin);
        return financialStatisticsService.findAllByOrganization(organization);
    }

    @AssertEntityExistsById(entityClass = Organization.class)
    @RequestMapping(method = RequestMethod.GET, params = {"bin", "year"})
    @ResponseBody
    public List<FinancialStatisticsByQuarter> getFinancialStatisticsOfOrganizationByYear(
            @RequestParam("bin") @EntityIdentifier long bin, @RequestParam(value = "year") int year) {
        return financialStatisticsService.findAllByOrganizationAndYear(new Organization(bin), year);
    }

    @AssertEntityExistsById(entityClass = Organization.class)
    @RequestMapping(method = RequestMethod.GET, params = {"bin", "year", "quarter"})
    @ResponseBody
    public FinancialStatisticsByQuarter getFinancialStatisticsOfOrganizationByQuarterAndYear(
            @RequestParam("bin") @EntityIdentifier long bin, @RequestParam("year") int year,
            @RequestParam("quarter") byte quarter) {
        return financialStatisticsService.findByOrganizationAndYearAndQuarter(new Organization(bin), year, quarter);
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

    @AssertEntityExistsById(entityClass = Organization.class)
    @RequestMapping(method = RequestMethod.GET, params = {"action=getMaxYear", "bin"})
    @ResponseBody
    public int getMaxYearOfFinancialStatistics(@RequestParam("bin") @EntityIdentifier long organizationBin) {
        return financialStatisticsService.findMaxYear(organizationBin);
    }

    @AssertEntityExistsById(entityClass = Organization.class)
    @RequestMapping(method = RequestMethod.GET, params = {"action=getMinYear", "bin"})
    @ResponseBody
    public int getMinYearOfFinancialStatistics(@RequestParam("bin") @EntityIdentifier long organizationBin) {
        return financialStatisticsService.findMinYear(organizationBin);
    }

    @RequestMapping(method = RequestMethod.POST, headers = {"token"})
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public ResponseEntity save(@RequestBody FinancialStatisticsByQuarter financialStatisticsByQuarter,
                               @RequestHeader(value = "token", required = false) String tokenValue) {
        financialStatisticsService.save(financialStatisticsByQuarter);
        return ResponseEntity.ok().build();
    }

    @AssertEntityExistsById(entityClass = Organization.class)
    @RequestMapping(value = "/years", method = RequestMethod.GET, params = {"bin"})
    @ResponseBody
    public List<Integer> findYearsOfFinancialStatisticsOfOrganization(@RequestParam("bin")
                                                                          @EntityIdentifier long organizationBin) {
        return financialStatisticsService.findYearsOfFinancialStatisticsOfOrganization(organizationBin);
    }
}