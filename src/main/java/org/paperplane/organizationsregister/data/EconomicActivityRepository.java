package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.EconomicActivityCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EconomicActivityRepository extends JpaRepository<EconomicActivity, Integer>,
        EconomicActivityCustomQueriesCaller {
    EconomicActivity save(EconomicActivity economicActivity);
    EconomicActivity findById(int id);
    EconomicActivity findByName(String name);
    List<EconomicActivity> findAllByNameLike(String possibleName);
    List<EconomicActivity> findAllByNameContains(String line);
    boolean existsById(Integer id);

    @Modifying
    @Query("update EconomicActivity target set target.name = :#{#economicActivity.name} " +
            "where target.id = :#{#economicActivity.id}")
    void update(@Param("economicActivity") EconomicActivity economicActivity);
}
