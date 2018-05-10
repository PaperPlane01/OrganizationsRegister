package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.TaxesCommitteeCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxesCommitteeRepository extends JpaRepository<TaxesCommittee, Integer>,
        TaxesCommitteeCustomQueriesCaller {
    TaxesCommittee save(TaxesCommittee taxesCommittee);
    TaxesCommittee findById(int id);
    List<TaxesCommittee> findAllByNameContains(String line);
    boolean existsById(Integer id);
    List<TaxesCommittee> findByCriteria(TaxesCommitteeSearchCriteria searchCriteria);
}
