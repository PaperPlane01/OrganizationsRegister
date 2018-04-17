package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.Organization;

import java.util.List;

public interface BankService {
    Bank save(Bank bank);
    Bank update(Bank bank);
    Bank findById(int id);
    List<Organization> getOrganizationsServedByBank(Bank bank);
    void assertBankExists(int id);
}
