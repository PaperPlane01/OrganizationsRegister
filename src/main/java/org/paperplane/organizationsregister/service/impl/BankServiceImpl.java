package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.BankRepository;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.BankNotFoundException;
import org.paperplane.organizationsregister.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class BankServiceImpl implements BankService {

    private BankRepository bankRepository;

    @Autowired
    public BankServiceImpl(BankRepository bankRepository) {
        this.bankRepository = bankRepository;
    }


    @Override
    public Bank save(Bank bank) {
        return bankRepository.save(bank);
    }

    @Override
    public Bank update(Bank bank) {
        return bankRepository.update(bank);
    }

    @Override
    public Bank findById(int id) {
        return bankRepository.findById(id);
    }

    @Override
    public void assertBankExists(int id) {
        if (bankRepository.findById(id) == null) {
            throw new BankNotFoundException();
        }
    }
}
