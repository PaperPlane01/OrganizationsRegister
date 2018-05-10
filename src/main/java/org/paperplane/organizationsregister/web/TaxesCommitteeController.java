package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.paperplane.organizationsregister.service.TaxesCommitteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/api/taxes-committees")
public class TaxesCommitteeController {

    private TaxesCommitteeService taxesCommitteeService;

    @Autowired
    public TaxesCommitteeController(TaxesCommitteeService taxesCommitteeService) {
        this.taxesCommitteeService = taxesCommitteeService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    @AssertEntityExists
    @ResponseBody
    public TaxesCommittee findById(@PathVariable("id") @EntityIdentifier(entityClass = TaxesCommittee.class) int id) {
        return taxesCommitteeService.findById(id);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"nameContains"})
    @ResponseBody
    public List<TaxesCommittee> getTaxesCommitteesWithNameContains(@RequestParam("nameContains") String nameContains) {
        return taxesCommitteeService.findByNameContains(nameContains);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public TaxesCommittee save(@RequestBody @Valid TaxesCommittee taxesCommittee,
                               @RequestHeader(value = "token", required = false) String tokenValue) {
        return taxesCommitteeService.save(taxesCommittee);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public TaxesCommittee update(@RequestBody @Valid TaxesCommittee taxesCommittee,
                                 @RequestHeader(value = "token", required = false) String tokenValue) {
       return taxesCommitteeService.update(taxesCommittee);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/search")
    @ResponseBody
    public List<TaxesCommittee> findByCriteria(@RequestBody TaxesCommitteeSearchCriteria searchCriteria) {
        return taxesCommitteeService.findByCriteria(searchCriteria);
    }
}