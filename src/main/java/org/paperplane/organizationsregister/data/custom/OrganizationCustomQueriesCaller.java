package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.Organization;

import java.util.List;

public interface OrganizationCustomQueriesCaller {
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(Organization organization);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin);
    List<Organization> findByCriteria(OrganizationSearchCriteria organizationSearchCriteria);
}
