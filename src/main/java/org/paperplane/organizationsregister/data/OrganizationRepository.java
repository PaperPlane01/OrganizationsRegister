package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.OrganizationCustomQueriesCaller;
import org.paperplane.organizationsregister.data.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrganizationRepository extends JpaRepository<Organization, Long>, OrganizationCustomQueriesCaller {
    Organization save(Organization organization);
    Organization findByBin(long bin);
    List<Organization> findAllByNumberOfEmployeesBetween(int start, int end);
    List<Organization> findAllByFullNameContains(String line);
    List<Organization> findAllByShortNameContains(String line);
    List<Organization> findAllByRegistrationDateGreaterThan(Date date);
    List<Organization> findAllByPermittedEconomicActivitiesContains(EconomicActivity economicActivity);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(Organization organization);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin);

    List<Organization> findAllBy(Pageable pageRequest);

    @Query("update Organization set fullName = :#{#organization.fullName} where bin = :#{#organization.bin}")
    void updateFullName(@Param("organization") Organization organization);

    @Query("update Organization set shortName = :#{#organization.shortName} where bin = :#{#organization.bin}")
    void updateShortName(@Param("organization") Organization organization);

    Organization update(Organization organization);
    List<Organization> findByCriteria(OrganizationSearchCriteria criteria);
}
