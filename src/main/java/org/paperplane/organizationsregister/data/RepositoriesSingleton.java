package org.paperplane.organizationsregister.data;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Component;

@Component
public class RepositoriesSingleton implements ApplicationContextAware {
    private static Repositories instance = null;

    private static ApplicationContext applicationContext;

    private RepositoriesSingleton() {

    }

    public static Repositories getInstance() {
        Repositories localInstance = instance;

        if (localInstance == null) {
            synchronized (RepositoriesSingleton.class) {
                localInstance = instance;
                if (localInstance == null) {
                    instance = localInstance = new Repositories(applicationContext);
                }
            }
        }

        return localInstance;
    }

    public void setApplicationContext(ApplicationContext applicationContext) {
        RepositoriesSingleton.applicationContext = applicationContext;
    }
}