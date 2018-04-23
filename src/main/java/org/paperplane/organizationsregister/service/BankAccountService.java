package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;

import java.util.List;

public interface BankAccountService {
    List<BankAccount> findByOrganization(Organization organization);
    List<BankAccount> findByBank(Bank bank);
    List<BankAccount> findByOrganizationAndBank(Organization organization, Bank bank);
}
