package org.paperplane.organizationsregister.data.impl;

import org.paperplane.organizationsregister.data.custom.UserCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.User;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManagerFactory;

public class UserRepositoryImpl implements UserCustomQueriesCaller {
    private EntityManagerFactory entityManagerFactory;

    @Autowired
    public UserRepositoryImpl(EntityManagerFactory entityManagerFactory) {
        this.entityManagerFactory = entityManagerFactory;
    }

    @Override
    public User update(User user) {
        return entityManagerFactory.createEntityManager().merge(user);
    }
}
