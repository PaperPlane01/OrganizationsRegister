package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, Integer> {
    BankAccount save(BankAccount bankAccount);
    List<BankAccount> findAllByOrganizationRegistrationDate(Date date);
    boolean existsById(Integer id);
}
