package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankRepository extends JpaRepository<Bank, Integer>, BankCustomQueriesCaller {
    Bank save(Bank bank);
    Bank findById(int id);
    List<Bank> findAllByNameContains(String line);
    boolean existsById(Integer id);
    List<Bank> findByCriteria(BankSearchCriteria searchCriteria);
}
