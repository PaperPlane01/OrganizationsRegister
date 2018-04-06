package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxesCommitteeRepository extends JpaRepository<TaxesCommittee, Integer> {
    TaxesCommittee save(TaxesCommittee taxesCommittee);
    TaxesCommittee findById(int id);
    TaxesCommittee findByNameAndAddress(String name, String address);
    List<TaxesCommittee> findAllByNameContains(String line);
    boolean existsById(Integer id);
}
