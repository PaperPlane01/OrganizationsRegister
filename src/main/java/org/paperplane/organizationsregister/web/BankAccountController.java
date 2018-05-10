package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.BankAccountSearchCriteria;
import org.paperplane.organizationsregister.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping(value = "/api/bank-accounts")
public class BankAccountController {
    @Autowired
    private BankAccountService bankAccountService;

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"bankID"})
    @ResponseBody
    public List<BankAccount> findByBankId(@RequestParam("bankID") @EntityIdentifier(entityClass = Bank.class) int bankID) {
        return bankAccountService.findByBank(new Bank(bankID));
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"organizationBIN"})
    @ResponseBody
    public List<BankAccount> findByOrganizationBin(
            @RequestParam("organizationBIN")
            @EntityIdentifier(entityClass = Organization.class) long organizationBIN) {
        return bankAccountService.findByOrganization(new Organization(organizationBIN));
    }

    @RequestMapping(method = RequestMethod.GET, params = {"organizationBIN", "bankID"})
    @ResponseBody
    public List<BankAccount> findByOrganizationAndBank(
            @RequestParam("organizationBIN") @EntityIdentifier(entityClass = Organization.class) long organizationBIN,
            @RequestParam("bankID") @EntityIdentifier(entityClass = Bank.class) int bankID) {
        return bankAccountService.findByOrganizationAndBank(new Organization(organizationBIN), new Bank(bankID));
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public BankAccount save(@RequestBody @Valid BankAccount bankAccount,
                            @RequestHeader(value = "token", required = false) String tokenValue) {
        System.out.println(bankAccount.getId());
        return bankAccountService.save(bankAccount);
    }

    @RequestMapping(method = RequestMethod.PUT)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public BankAccount update(@RequestBody @Valid BankAccount bankAccount,
                              @RequestHeader(value = "token", required = false) String tokenValue) {
        return bankAccountService.update(bankAccount);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/search")
    @ResponseBody
    public List<BankAccount> findByCriteria(@RequestBody BankAccountSearchCriteria searchCriteria) {
        return bankAccountService.findByCriteria(searchCriteria);
    }
}