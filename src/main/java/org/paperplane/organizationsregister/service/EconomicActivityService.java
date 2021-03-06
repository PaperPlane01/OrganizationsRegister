package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.search.EconomicActivitySearchCriteria;

import java.util.List;

public interface EconomicActivityService {
    EconomicActivity save(EconomicActivity economicActivity);
    List<EconomicActivity> findByNameContains(String name);
    EconomicActivity findById(int id);
    List<EconomicActivity> findByCriteria(EconomicActivitySearchCriteria searchCriteria);
    EconomicActivity update(EconomicActivity economicActivity);
    boolean existsById(Integer id);
}
