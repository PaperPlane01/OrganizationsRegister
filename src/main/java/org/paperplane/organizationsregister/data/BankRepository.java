package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.BankCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BankRepository extends JpaRepository<Bank, Integer>, BankCustomQueriesCaller {
    Bank save(Bank bank);

    @Modifying
    @Query("update Bank  b set b.name = :#{#bank.name}, b.address = :#{bank.address}")

    Bank update(Bank bank);
    Bank findById(int id);
    List<Bank> findAllByName(String name);
    boolean existsById(Integer id);
}
