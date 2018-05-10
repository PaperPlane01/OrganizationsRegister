package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;

public interface UserService {
    User save(User user);
    User update(User user);
    UserRole getRoleByName(String name);
    User findUserByUsername(String username);
    User findUserById(int id);
    void assertUsernameAndPasswordAreCorrect(String username, String password);
}
