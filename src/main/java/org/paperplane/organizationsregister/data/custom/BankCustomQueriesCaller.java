package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;

import java.util.List;

public interface BankCustomQueriesCaller {
    List<Bank> findByCriteria(BankSearchCriteria searchCriteria);
}
