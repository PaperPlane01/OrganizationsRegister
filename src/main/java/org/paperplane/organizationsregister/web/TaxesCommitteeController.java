package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.paperplane.organizationsregister.service.TaxesCommitteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/taxes-committees")
public class TaxesCommitteeController {

    private TaxesCommitteeService taxesCommitteeService;

    @Autowired
    public TaxesCommitteeController(TaxesCommitteeService taxesCommitteeService) {
        this.taxesCommitteeService = taxesCommitteeService;
    }

    @RequestMapping(method = RequestMethod.GET, params = {"nameContains"})
    @ResponseBody
    public List<TaxesCommittee> getTaxesCommitteesWithNameContains(@RequestParam("nameContains") String nameContains) {
        return taxesCommitteeService.findByNameContains(nameContains);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public ResponseEntity save(@RequestBody TaxesCommittee taxesCommittee,
                                            @RequestHeader(value = "token", required = false) String tokenValue) {
        taxesCommitteeService.save(taxesCommittee);
        return ResponseEntity.ok().build();
    }
}
