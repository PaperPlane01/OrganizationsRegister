package org.paperplane.organizationsregister.service;

import org.paperplane.organizationsregister.domain.Token;
import org.paperplane.organizationsregister.domain.User;

public interface TokenService {
    void assertTokenExists(String tokenValue);
    Token getToken(User user);
    User getUserByTokenValue(String tokenValue);
    Token update(Token token);
    Token getTokenByValue(String value);
    void markTokenAsExpired(Token token);
}
