package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExistsById;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.Bank;
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
    @AssertEntityExistsById(entityClass = Bank.class)
    @ResponseBody
    public Bank getById(@PathVariable("id") @EntityIdentifier int id) {
        return bankService.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    @ResponseBody
    public ResponseEntity<Object> save(@RequestBody Bank bank,
                                       @RequestHeader(value = "token", required = false) String tokenValue) {
        bankService.save(bank);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/organizations")
    @ResponseBody
    public List<Organization> findOrganizationsServedByBank(@PathVariable("id") int bankID) {
        return bankService.getOrganizationsServedByBank(new Bank(bankID));
    }
}
