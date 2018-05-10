package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.OrganizationTypeCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.search.OrganizationTypeSearchCriteria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrganizationTypeRepository extends JpaRepository<OrganizationType, Integer>,
        OrganizationTypeCustomQueriesCaller {
    OrganizationType save(OrganizationType organizationType);
    OrganizationType findById(int id);
    List<OrganizationType> findAllByNameContains(String line);
    List<OrganizationType> findAll();
    boolean existsById(Integer id);
    List<OrganizationType> findByCriteria(OrganizationTypeSearchCriteria searchCriteria);
}
