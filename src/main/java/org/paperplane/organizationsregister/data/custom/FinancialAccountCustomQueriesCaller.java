package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;

import java.util.List;

public interface FinancialAccountCustomQueriesCaller {
    List<FinancialAccount> findByCriteria(FinancialAccountSearchCriteria searchCriteria);
}
