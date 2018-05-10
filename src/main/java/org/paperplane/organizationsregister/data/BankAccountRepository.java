package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.BankAccountCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.BankAccountSearchCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long>, BankAccountCustomQueriesCaller {
    BankAccount save(BankAccount bankAccount);
    List<BankAccount> findAllByBank(Bank bank);
    List<BankAccount> findAllByOrganizationRegistrationDate(Date date);
    List<BankAccount> findAllByOrganization(Organization organization);
    List<BankAccount> findAllByOrganizationAndBank(Organization organization, Bank bank);
    boolean existsById(Long id);
    List<BankAccount> findByCriteria(BankAccountSearchCriteria searchCriteria);
}
