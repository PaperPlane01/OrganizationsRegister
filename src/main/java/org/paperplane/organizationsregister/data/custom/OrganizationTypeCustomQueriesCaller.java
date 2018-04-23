package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.search.OrganizationTypeSearchCriteria;

import java.util.List;

public interface OrganizationTypeCustomQueriesCaller {
    List<OrganizationType> findByCriteria(OrganizationTypeSearchCriteria searchCriteria);
}
