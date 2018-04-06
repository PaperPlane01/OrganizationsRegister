package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.UserRepository;
import org.paperplane.organizationsregister.data.UserRoleRepository;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;
import org.paperplane.organizationsregister.exception.NoMatchFoundForGivenUsernameAndPasswordException;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.UserNotFoundException;
import org.paperplane.organizationsregister.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserRoleRepository userRoleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.update(user);
    }

    @Override
    public UserRole getRoleByName(String name) {
        return userRoleRepository.findByName(name);
    }

    @Override
    public List<User> findUsersWithRole(UserRole userRole) {
        return userRepository.findAllByRolesContains(userRole);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public void assertUsernameAndPasswordAreCorrect(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new NoMatchFoundForGivenUsernameAndPasswordException();
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new NoMatchFoundForGivenUsernameAndPasswordException();
        }
    }

    @Override
    public void assertUserExistsByUserId(int id) {
        if (userRepository.findById(id) == null) {
            throw new UserNotFoundException();
        }
    }

    @Override
    public void assertUserExistsByUsername(String username) {
        if (userRepository.findByUsername(username) == null) {
            throw new UserNotFoundException();
        }
    }
}
