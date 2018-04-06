package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.TokenRepository;
import org.paperplane.organizationsregister.domain.Token;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.exception.InvalidTokenException;
import org.paperplane.organizationsregister.exception.TokenExpiredException;
import org.paperplane.organizationsregister.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Base64;
import java.util.UUID;

@Service
@Transactional
public class TokenServiceImpl implements TokenService{
    private TokenRepository tokenRepository;

    @Autowired
    public TokenServiceImpl(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    public void assertTokenNotExpired(Token token) {
        Token receivedToken = tokenRepository.findById(token.getId());
        if (receivedToken.isExpired()) {
            throw new TokenExpiredException();
        }
    }

    @Override
    public void assertTokenExists(String tokenValue) {
        if (tokenRepository.findByValue(tokenValue) == null) {
            throw new InvalidTokenException();
        }
    }

    @Override
    public Token getToken(User user) {
        String tokenValue = generateTokenValue();
        Token token = new Token();
        token.setUser(user);
        token.setExpired(false);
        token.setValue(tokenValue);
        token = tokenRepository.save(token);
        return token;
    }

    @Override
    public User getUserByTokenValue(String tokenValue) {
        Token receivedToken = tokenRepository.findByValue(tokenValue);
        return receivedToken.getUser();
    }

    @Override
    public Token update(Token token) {
        return tokenRepository.update(token);
    }

    @Override
    public Token getTokenByValue(String value) {
        return tokenRepository.findByValue(value);
    }

    @Override
    public void markTokenAsExpired(Token token) {
        tokenRepository.markAsExpired(token);
    }

    private String generateTokenValue() {
        return new String(Base64.getEncoder().encode(UUID.randomUUID().toString().getBytes()));
    }
}
