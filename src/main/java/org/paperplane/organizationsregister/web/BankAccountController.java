package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/api/bank-accounts")
public class BankAccountController {
    @Autowired
    private BankAccountService bankAccountService;

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"bankID"})
    @ResponseBody
    public List<BankAccount> findByBank(@RequestParam("bankID") @EntityIdentifier(entityClass = Bank.class) int bankID) {
        return bankAccountService.findByBank(new Bank(bankID));
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, params = {"organizationBIN"})
    @ResponseBody
    public List<BankAccount> findByOrganization(
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
}
