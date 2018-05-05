package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.FinancialAccountRepository;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;
import org.paperplane.organizationsregister.service.FinancialAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FinancialAccountServiceImpl implements FinancialAccountService {
    @Autowired
    private FinancialAccountRepository financialAccountRepository;

    @Override
    public FinancialAccount findById(int id) {
        return financialAccountRepository.findById(id);
    }

    @Override
    public List<FinancialAccount> findAllWithNameContains(String line) {
        return financialAccountRepository.findAllByNameContains(line);
    }

    @Override
    public List<FinancialAccount> findAllByCriteria(FinancialAccountSearchCriteria searchCriteria) {
        return financialAccountRepository.findByCriteria(searchCriteria);
    }

    @Override
    public FinancialAccount save(FinancialAccount financialAccount) {
        return financialAccountRepository.save(financialAccount);
    }

    @Override
    public FinancialAccount update(FinancialAccount financialAccount) {
        return financialAccountRepository.save(financialAccount);
    }
}
