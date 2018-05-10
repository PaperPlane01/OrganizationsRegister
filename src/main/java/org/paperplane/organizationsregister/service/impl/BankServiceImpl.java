package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.BankAccountRepository;
import org.paperplane.organizationsregister.data.BankRepository;
import org.paperplane.organizationsregister.data.OrganizationRepository;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankServiceImpl implements BankService {

    private BankRepository bankRepository;
    private BankAccountRepository bankAccountRepository;
    private OrganizationRepository organizationRepository;

    @Autowired
    public BankServiceImpl(BankRepository bankRepository, BankAccountRepository bankAccountRepository,
                           OrganizationRepository organizationRepository) {
        this.bankRepository = bankRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.organizationRepository = organizationRepository;
    }


    @Override
    public Bank save(Bank bank) {
        return bankRepository.save(bank);
    }

    @Override
    public Bank update(Bank bank) {
        return bankRepository.save(bank);
    }

    @Override
    public Bank findById(int id) {
        return bankRepository.findById(id);
    }

    @Override
    public List<Bank> findBanksWithNameContains(String line) {
        return bankRepository.findAllByNameContains(line);
    }

    @Override
    public List<Organization> getOrganizationsServedByBank(Bank bank) {
        return organizationRepository.findOrganizationsServedByBank(bank);
    }

    @Override
    public List<BankAccount> findBankAccountsOfBank(Bank bank) {
        return bankAccountRepository.findAllByBank(bank);
    }

    @Override
    public List<Bank> findBanksByCriteria(BankSearchCriteria searchCriteria) {
        return bankRepository.findByCriteria(searchCriteria);
    }

}
