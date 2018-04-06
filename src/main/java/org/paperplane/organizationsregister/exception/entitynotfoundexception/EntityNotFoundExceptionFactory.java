package org.paperplane.organizationsregister.exception.entitynotfoundexception;

import com.google.common.collect.ImmutableMap;
import org.paperplane.organizationsregister.domain.*;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class EntityNotFoundExceptionFactory {
    private Map<Class, CustomEntityNotFoundException> exceptionsMap;

    public EntityNotFoundExceptionFactory() {
        exceptionsMap = ImmutableMap.<Class, CustomEntityNotFoundException>builder()
                .put(User.class, new UserNotFoundException())
                .put(Organization.class, new OrganizationNotFoundException())
                .put(OrganizationType.class, new OrganizationTypeNotFoundException())
                .put(Bank.class, new BankNotFoundException())
                .put(TaxesCommittee.class, new TaxesCommitteeNotFoundException())
                .build();
    }

    public CustomEntityNotFoundException createForEntityClass(Class entityClass) {
        if (!exceptionsMap.containsKey(entityClass)) {
            throw new IllegalArgumentException("There is no mapped exception for given entity class");
        }

        return exceptionsMap.get(entityClass);
    }
}