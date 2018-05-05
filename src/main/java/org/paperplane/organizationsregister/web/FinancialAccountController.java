package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;
import org.paperplane.organizationsregister.service.FinancialAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/financial-accounts")
public class FinancialAccountController {
    @Autowired
    private FinancialAccountService financialAccountService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public FinancialAccount findById(@EntityIdentifier(entityClass = FinancialAccount.class) @PathVariable("id") int id) {
        return financialAccountService.findById(id);
    }

    @RequestMapping(params = {"nameContains"}, method = RequestMethod.GET)
    @ResponseBody
    public List<FinancialAccount> findAllWithNameContains(@RequestParam("nameContains") String line) {
        return financialAccountService.findAllWithNameContains(line);
    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    List<FinancialAccount> findByCriteria(@RequestBody FinancialAccountSearchCriteria searchCriteria) {
        return financialAccountService.findAllByCriteria(searchCriteria);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public FinancialAccount save(@RequestBody FinancialAccount financialAccount,
                                 @RequestHeader(value = "token", required = false) String tokenValue) {
        return financialAccountService.save(financialAccount);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public FinancialAccount update(@RequestBody FinancialAccount financialAccount,
                                   @RequestHeader(value = "token", required = false) String tokenValue) {
        return financialAccountService.update(financialAccount);
    }
}