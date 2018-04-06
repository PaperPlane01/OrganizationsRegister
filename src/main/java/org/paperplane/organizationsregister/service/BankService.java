package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.Bank;

public interface BankService {
    Bank save(Bank bank);
    Bank update(Bank bank);
    Bank findById(int id);
    void assertBankExists(int id);
}
