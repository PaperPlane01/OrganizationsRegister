package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.OrganizationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrganizationTypeRepository extends JpaRepository<OrganizationType, Integer> {
    OrganizationType save(OrganizationType organizationType);
    OrganizationType findByName(String name);
    OrganizationType findById(int id);
    List<OrganizationType> findAllByNameContains(String line);
    List<OrganizationType> findAll();
    boolean existsById(Integer id);
}
