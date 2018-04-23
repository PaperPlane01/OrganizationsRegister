package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinancialAccountRepository extends JpaRepository<FinancialAccount, Integer> {
    FinancialAccount save(FinancialAccount financialAccount);
    FinancialAccount findByName(String name);
    FinancialAccount findById(int id);
    List<FinancialAccount> findAllByNameContains(String line);
    boolean existsById(Integer id);
}
