package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.TaxesCommitteeCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaxesCommitteeRepository extends JpaRepository<TaxesCommittee, Integer>,
        TaxesCommitteeCustomQueriesCaller {
    TaxesCommittee save(TaxesCommittee taxesCommittee);
    TaxesCommittee findById(int id);
    TaxesCommittee findByNameAndAddress(String name, String address);
    List<TaxesCommittee> findAllByNameContains(String line);
    boolean existsById(Integer id);
    List<TaxesCommittee> findByCriteria(TaxesCommitteeSearchCriteria searchCriteria);

    @Modifying
    @Query("update TaxesCommittee target set target.name = :#{#taxesCommittee.name}, " +
            "target.address = :#{#taxesCommittee.address} " +
            "where target.id = :#{#taxesCommittee.id}")
    void update(TaxesCommittee taxesCommittee);
}
