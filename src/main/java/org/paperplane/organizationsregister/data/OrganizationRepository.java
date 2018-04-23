package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.OrganizationCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.search.OrganizationSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.Organization;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(Organization organization);
    int findNumberOfYearsSinceOrganizationHasBeenRegistered(long bin);
    List<Organization> findAllBy(Pageable pageRequest);

    List<Organization> findByCriteria(OrganizationSearchCriteria criteria);

    @Query("select organization from BankAccount bankAccount where bankAccount.bank = :#{#bank}")
    List<Organization> findOrganizationsServedByBank(@Param("bank") Bank bank);

    @Modifying(clearAutomatically = true)
    @Query("update Organization target " +
            "set target.fullName = :#{#organization.fullName}, target.shortName = :#{#organization.shortName}, " +
            "target.address = :#{#organization.address}, target.founder = :#{#organization.founder}, " +
            "target.numberOfEmployees = :#{#organization.numberOfEmployees}, target.phoneNumber = :#{#organization.phoneNumber}, " +
            "target.organizationType = :#{#organization.organizationType}, " +
            "target.primaryEconomicActivity = :#{#organization.primaryEconomicActivity}, " +
            "target.permittedEconomicActivities = :#{#organization.permittedEconomicActivities}, " +
            "target.registrationDate = :#{#organization.registrationDate}, " +
            "target.taxesCommittee = :#{#organization.taxesCommittee} " +
            "where target.bin = :#{#organization.bin}")
    void update(@Param("organization") Organization organization);
}