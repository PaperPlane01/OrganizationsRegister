package org.paperplane.organizationsregister.data.impl;

import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Bank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
@Transactional
public class BankRepositoryImpl implements BankCustomQueriesCaller {

    @Autowired
    private EntityManager entityManagerFactory;

    @Override
    public Bank update(Bank bank) {
        return entityManagerFactory.merge(bank);
    }
}
