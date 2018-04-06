package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EconomicActivityRepository extends JpaRepository<EconomicActivity, Integer> {
    EconomicActivity save(EconomicActivity economicActivity);
    EconomicActivity findById(int id);
    EconomicActivity findByName(String name);
    List<EconomicActivity> findAllByNameLike(String possibleName);
    List<EconomicActivity> findAllByNameContains(String line);
    boolean existsById(Integer id);
}
