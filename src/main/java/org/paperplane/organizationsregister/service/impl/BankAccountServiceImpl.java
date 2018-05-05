package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.BankAccountRepository;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.BankAccountSearchCriteria;
import org.paperplane.organizationsregister.exception.BankAccountAlreadyExistsException;
import org.paperplane.organizationsregister.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankAccountServiceImpl implements BankAccountService {
    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Override
    public List<BankAccount> findByOrganization(Organization organization) {
        return bankAccountRepository.findAllByOrganization(organization);
    }

    @Override
    public List<BankAccount> findByBank(Bank bank) {
        return bankAccountRepository.findAllByBank(bank);
    }

    @Override
    public List<BankAccount> findByOrganizationAndBank(Organization organization, Bank bank) {
        return bankAccountRepository.findAllByOrganizationAndBank(organization, bank);
    }

    @Override
    public BankAccount save(BankAccount bankAccount) {
        if (bankAccountRepository.existsById(bankAccount.getId())) {
            throw new BankAccountAlreadyExistsException();
        }

        return bankAccountRepository.save(bankAccount);
    }

    @Override
    public BankAccount update(BankAccount bankAccount) {
        return bankAccountRepository.save(bankAccount);
    }

    @Override
    public List<BankAccount> findByCriteria(BankAccountSearchCriteria searchCriteria) {
        return bankAccountRepository.findByCriteria(searchCriteria);
    }
}
