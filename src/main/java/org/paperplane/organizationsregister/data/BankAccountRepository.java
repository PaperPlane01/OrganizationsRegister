package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.BankAccount;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    BankAccount save(BankAccount bankAccount);
    List<BankAccount> findAllByBank(Bank bank);
    List<BankAccount> findAllByOrganizationRegistrationDate(Date date);
    List<BankAccount> findAllByOrganization(Organization organization);
    List<BankAccount> findAllByOrganizationAndBank(Organization organization, Bank bank);
    boolean existsById(Long id);
}
