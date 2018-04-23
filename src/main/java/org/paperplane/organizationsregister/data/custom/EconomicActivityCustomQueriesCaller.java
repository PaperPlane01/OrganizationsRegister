package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.search.EconomicActivitySearchCriteria;

import java.util.List;

public interface EconomicActivityCustomQueriesCaller {
    List<EconomicActivity> findByCriteria(EconomicActivitySearchCriteria searchCriteria);
}
