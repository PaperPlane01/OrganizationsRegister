package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface BankService {
    Bank save(Bank bank);
    Bank update(Bank bank);
    Bank findById(int id);
    List<Bank> findBanksWithNameContains(String line);
    List<Organization> getOrganizationsServedByBank(Bank bank);
    List<BankAccount> findBankAccountsOfBank(Bank bank);
    List<Bank> findBanksByCriteria(BankSearchCriteria searchCriteria);
    List<Map<Organization, Bank>> findBanksByOrganizationRegistrationDate(Date registrationDate);
}
