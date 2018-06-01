package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.BankAccountSearchCriteria;

import java.util.List;

public interface BankAccountCustomQueriesCaller {
    List<BankAccount> findByCriteria(BankAccountSearchCriteria searchCriteria);
}
