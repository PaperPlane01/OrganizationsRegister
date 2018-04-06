package org.paperplane.organizationsregister.data.impl;

import org.paperplane.organizationsregister.data.custom.TokenCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManagerFactory;

@Repository
public class TokenRepositoryImpl implements TokenCustomQueriesCaller {
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    public TokenRepositoryImpl(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public Token update(Token token) {
        return entityManagerFactory.createEntityManager().merge(token);
    }

    @Override
    public int getUserIdByTokenValue(String value) {
        throw new UnsupportedOperationException("Method has not been implemented yet.");
    }
}
