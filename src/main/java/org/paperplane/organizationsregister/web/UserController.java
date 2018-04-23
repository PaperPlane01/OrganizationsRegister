package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;
import org.paperplane.organizationsregister.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/users")
public class UserController {
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @AssertEntityExists
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public User getUser(@PathVariable("id") @EntityIdentifier(entityClass = User.class) int id) {
        return userService.findUserById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public ResponseEntity<Object> save(@RequestBody User user,
                                           @RequestHeader(value = "token", required = false) String tokenValue) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        return ResponseEntity.ok().build();
    }

    @AssertEntityExists
    @RequestMapping(method = RequestMethod.GET, value = "/{id}/roles")
    @ResponseBody
    public List<UserRole> getUserRolesByUserId(@PathVariable("id") @EntityIdentifier(entityClass = User.class) int id) {
        return userService.findUserById(id).getRoles();
    }
}