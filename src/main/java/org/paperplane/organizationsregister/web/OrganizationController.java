package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExistsById;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.data.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    @AssertEntityExistsById(entityClass = Organization.class)
    @ResponseBody
    public Organization getByBin(@PathVariable("bin") @EntityIdentifier long bin) {
        return organizationService.findByBin(bin);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"page"})
    @ResponseBody
    public List<Organization> findAll(@RequestParam("page") int page) {
        Pageable pageRequest = PageRequest.of(page, 10, new Sort(Sort.Direction.ASC, "fullName"));
        return organizationService.findAll(pageRequest);
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

    @AssertEntityExistsById(entityClass = OrganizationType.class)
    @RequestMapping(value = "/organization-types/{id}", method = RequestMethod.GET)
    @ResponseBody
    public OrganizationType findById(@PathVariable("id") @EntityIdentifier int id) {
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
    public ResponseEntity save(@RequestBody Organization organization,
                                          @RequestHeader(value = "token", required = false) String tokenValue) {
        organizationService.save(organization);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.PUT)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public ResponseEntity update(@RequestBody Organization organization,
                                             @RequestHeader(value = "token", required = false) String tokenValue) {
        organizationService.update(organization);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/organization-types", method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public ResponseEntity saveOrganizationType(@RequestBody OrganizationType organizationType,
                                              @RequestHeader(value = "token", required = false) String tokenValue) {
        organizationService.saveOrganizationType(organizationType);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public List<Organization> findOrganizationsByCriteria(@RequestBody OrganizationSearchCriteria criteria) {
        return organizationService.findOrganizationsByCriteria(criteria);
    }

    @RequestMapping(value = "/{bin}", method = RequestMethod.GET,
            params = {"action=getNumberOfYearsSinceOrganizationHasBeenRegistered"})
    @ResponseBody
    public int findNumberOfYearsSinceOrganizationHasBeenRegistered(@PathVariable("bin") long bin) {
        return organizationService.findNumberOfYearsSinceOrganizationHasBeenRegistered(bin);
    }
}