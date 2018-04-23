package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>{
    User save(User user);
    User findById(int id);
    List<User> findAllByRolesContains(UserRole role);
    User findByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
}
