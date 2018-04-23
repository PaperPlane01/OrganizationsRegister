package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;

import java.util.List;

public interface TaxesCommitteeCustomQueriesCaller {
    List<TaxesCommittee> findByCriteria(TaxesCommitteeSearchCriteria searchCriteria);
}
