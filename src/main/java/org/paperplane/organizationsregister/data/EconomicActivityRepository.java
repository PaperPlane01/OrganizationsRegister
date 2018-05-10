package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.EconomicActivityCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.search.EconomicActivitySearchCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EconomicActivityRepository extends JpaRepository<EconomicActivity, Integer>,
        EconomicActivityCustomQueriesCaller {
    EconomicActivity save(EconomicActivity economicActivity);
    EconomicActivity findById(int id);
    List<EconomicActivity> findAllByNameLike(String possibleName);
    List<EconomicActivity> findAllByNameContains(String line);
    boolean existsById(Integer id);
    List<EconomicActivity> findByCriteria(EconomicActivitySearchCriteria searchCriteria);
}
