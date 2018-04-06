package org.paperplane.organizationsregister.web;

import com.google.common.collect.ImmutableMap;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.Token;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.service.TokenService;
import org.paperplane.organizationsregister.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping(value = "/api/tokens")
public class TokenController {
    private TokenService tokenService;
    private UserService userService;

    @Autowired
    public TokenController(UserService userService, TokenService tokenService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET, params = {"username", "password"})
    @ResponseBody
    public Map<String, Object> getToken(@RequestParam("username") String username, @RequestParam("password") String password) {
        userService.assertUsernameAndPasswordAreCorrect(username, password);
        User user = userService.findUserByUsername(username);
        Token token = tokenService.getToken(user);

        return ImmutableMap.<String, Object>builder()
                .put("userID", user.getId())
                .put("username", user.getUsername())
                .put("token", token.getValue())
                .build();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @RequiresToken
    @ResponseBody
    public ResponseEntity invalidateToken(@RequestHeader(value = "token", required = false) String tokenValue) {
        tokenService.markTokenAsExpired(tokenService.getTokenByValue(tokenValue));
        return ResponseEntity.ok().build();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user-id")
    @RequiresToken
    @ResponseBody
    public int getUserIDByTokenValue(@RequestHeader(value = "token", required = false) String tokenValue) {
        Token token = tokenService.getTokenByValue(tokenValue);
        User user = token.getUser();
        return user.getId();
    }
}
