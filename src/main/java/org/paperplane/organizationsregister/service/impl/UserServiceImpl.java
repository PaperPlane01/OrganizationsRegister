package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.UserRepository;
import org.paperplane.organizationsregister.data.UserRoleRepository;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;
import org.paperplane.organizationsregister.exception.NoMatchFoundForGivenUsernameAndPasswordException;
import org.paperplane.organizationsregister.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return userRepository.save(user);
    }

    @Override
    public UserRole getRoleByName(String name) {
        return userRoleRepository.findByName(name);
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
}
