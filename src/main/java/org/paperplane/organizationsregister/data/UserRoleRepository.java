package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
    UserRole findByName(String name);
}
