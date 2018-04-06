package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;

import java.util.List;

public interface UserService {
    User save(User user);
    User update(User user);
    UserRole getRoleByName(String name);
    List<User> findUsersWithRole(UserRole userRole);
    User findUserByUsername(String username);
    User findUserById(int id);
    void assertUsernameAndPasswordAreCorrect(String username, String password);
    void assertUserExistsByUserId(int id);
    void assertUserExistsByUsername(String username);
}
