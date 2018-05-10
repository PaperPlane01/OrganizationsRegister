package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.FinancialAccountCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.search.FinancialAccountSearchCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinancialAccountRepository extends JpaRepository<FinancialAccount, Integer>,
        FinancialAccountCustomQueriesCaller {
    FinancialAccount save(FinancialAccount financialAccount);
    FinancialAccount findById(int id);
    List<FinancialAccount> findAllByNameContains(String line);
    List<FinancialAccount> findByCriteria(FinancialAccountSearchCriteria searchCriteria);
    boolean existsById(Integer id);
}
