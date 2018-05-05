package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/banks")
public class BankController {
    private BankService bankService;

    @Autowired
    public BankController(BankService bankService) {
        this.bankService = bankService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @AssertEntityExists
    @ResponseBody
    public Bank getById(@PathVariable("id") @EntityIdentifier(entityClass = Bank.class) int id) {
        return bankService.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public Bank save(@RequestBody Bank bank,
                                       @RequestHeader(value = "token", required = false) String tokenValue) {
        return bankService.save(bank);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/organizations")
    @AssertEntityExists
    @ResponseBody
    public List<Organization> findOrganizationsServedByBank(@PathVariable("id")
                                                                @EntityIdentifier(entityClass = Bank.class) int bankID) {
        return bankService.getOrganizationsServedByBank(new Bank(bankID));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/bank-accounts")
    @AssertEntityExists
    @ResponseBody
    public List<BankAccount> findBankAccountsOfBank(@PathVariable("id") @EntityIdentifier(entityClass = Bank.class)
                                                                int bankID) {
        return bankService.findBankAccountsOfBank(new Bank(bankID));
    }

    @RequestMapping(method = RequestMethod.GET, params = {"nameContains"})
    @ResponseBody
    public List<Bank> findBanksWithNameContains(@RequestParam("nameContains") String nameContains) {
        return bankService.findBanksWithNameContains(nameContains);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/search")
    @ResponseBody
    public List<Bank> findBanksByCriteria(@RequestBody BankSearchCriteria searchCriteria) {
        return bankService.findBanksByCriteria(searchCriteria);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public Bank updateBank(@RequestBody Bank bank,
                           @RequestHeader(value = "token", required = false) String tokenValue) {
        return bankService.update(bank);
    }
}