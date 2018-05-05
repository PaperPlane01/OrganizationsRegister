package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;

import java.util.List;

public interface FinancialAccountService {
    FinancialAccount findById(int id);
    List<FinancialAccount> findAllWithNameContains(String line);
    List<FinancialAccount> findAllByCriteria(FinancialAccountSearchCriteria searchCriteria);
    FinancialAccount save(FinancialAccount financialAccount);
    FinancialAccount update(FinancialAccount financialAccount);
}
