package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.UserCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>, UserCustomQueriesCaller{
    User save(User user);
    User update(User user);
    User findById(int id);
    List<User> findAllByRolesContains(UserRole role);
    User findByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
}