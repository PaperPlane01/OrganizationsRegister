package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.search.OrganizationTypeSearchCriteria;
import org.paperplane.organizationsregister.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/api/organizations")
public class OrganizationController {

    private OrganizationService organizationService;

    @Autowired
    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @RequestMapping(value = "/{bin}", method = RequestMethod.GET)
    @AssertEntityExists
    @ResponseBody
    public Organization findByBin(@PathVariable("bin") @EntityIdentifier(entityClass = Organization.class) long bin) {
        return organizationService.findByBin(bin);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"nameContains"})
    @ResponseBody
    public List<Organization> findOrganizationsWithNameContains(@RequestParam("nameContains") String nameContains) {
        return organizationService.findOrganizationsWithNameContains(nameContains);
    }

    @RequestMapping(value = "/organization-types", method = RequestMethod.GET, params = {"nameContains"})
    @ResponseBody
    public List<OrganizationType> findOrganizationTypesWithNameContains(@RequestParam("nameContains") String nameContains) {
        return organizationService.findOrganizationTypesWithNameContains(nameContains);
    }

    @AssertEntityExists
    @RequestMapping(value = "/organization-types/{id}", method = RequestMethod.GET)
    @ResponseBody
    public OrganizationType findOrganizationTypeById(@PathVariable("id") @EntityIdentifier(entityClass = OrganizationType.class) int id) {
        return organizationService.findOrganizationTypeById(id);
    }

    @RequestMapping(value = "/organization-types", method = RequestMethod.GET)
    @ResponseBody
    public List<OrganizationType> getOrganizationTypes() {
        return organizationService.findAllOrganizationTypes();
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public Organization save(@RequestBody @Valid Organization organization,
                                          @RequestHeader(value = "token", required = false) String tokenValue) {
        return organizationService.save(organization);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public Organization update(@RequestBody @Valid Organization organization,
                               @RequestHeader(value = "token", required = false) String tokenValue) {
        return organizationService.update(organization);
    }

    @RequestMapping(value = "/organization-types", method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public OrganizationType saveOrganizationType(@RequestBody @Valid OrganizationType organizationType,
                                              @RequestHeader(value = "token", required = false) String tokenValue) {
        return organizationService.saveOrganizationType(organizationType);
    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public List<Organization> findOrganizationsByCriteria(@RequestBody OrganizationSearchCriteria criteria) {
        return organizationService.findOrganizationsByCriteria(criteria);
    }

    @AssertEntityExists
    @RequestMapping(value = "/{bin}/number-of-years-since-registration", method = RequestMethod.GET)
    @ResponseBody
    public int findNumberOfYearsSinceOrganizationHasBeenRegistered(
            @PathVariable("bin") @EntityIdentifier(entityClass = Organization.class) long bin) {
        return organizationService.findNumberOfYearsSinceOrganizationHasBeenRegistered(bin);
    }

    @AssertEntityExists
    @RequestMapping(value = "/{bin}/bank-accounts", method = RequestMethod.GET)
    @ResponseBody
    public List<BankAccount> findBankAccountsOfOrganization(
            @PathVariable("bin") @EntityIdentifier(entityClass = Organization.class) long bin) {
        return organizationService.findBankAccountsOfOrganization(new Organization(bin));
    }

    @RequestMapping(method = RequestMethod.POST, value="/organization-types/search")
    @ResponseBody
    public List<OrganizationType> findOrganizationTypesByCriteria(OrganizationTypeSearchCriteria searchCriteria) {
        return organizationService.findOrganizationTypesByCriteria(searchCriteria);
    }
}