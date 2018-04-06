package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.data.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.Organization;

import java.util.List;

public interface OrganizationCustomQueriesCaller {
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(Organization organization);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin);
    List<Organization> findByCriteria(OrganizationSearchCriteria organizationSearchCriteria);
    Organization update(Organization organization);
}
