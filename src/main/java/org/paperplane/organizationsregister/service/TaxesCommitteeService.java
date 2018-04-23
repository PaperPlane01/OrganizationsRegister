package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;

import java.util.List;

public interface TaxesCommitteeService {
    TaxesCommittee save(TaxesCommittee taxesCommittee);
    TaxesCommittee findById(int id);
    List<TaxesCommittee> findByNameContains(String line);
    boolean existsById(Integer id);
    List<TaxesCommittee> findByCriteria(TaxesCommitteeSearchCriteria searchCriteria);
    TaxesCommittee update(TaxesCommittee taxesCommittee);
}
