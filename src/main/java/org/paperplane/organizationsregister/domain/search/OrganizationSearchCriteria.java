package org.paperplane.organizationsregister.domain.search;

import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.OrganizationType;
import org.paperplane.organizationsregister.domain.TaxesCommittee;

import java.util.Date;
import java.util.List;

public class OrganizationSearchCriteria {
    private Long bin;
    private String fullName;
    private String shortName;
    private TaxesCommittee taxesCommittee;
    private OrganizationType organizationType;
    private EconomicActivity primaryEconomicActivity;
    private List<EconomicActivity> permittedEconomicActivities;
    private Integer numberOfEmployees;
    private Integer minNumberOfEmployees;
    private Integer maxNumberOfEmployees;
    private String founder;
    private String phoneNumber;
    private Date registrationDate;
    private Date minRegistrationDate;
    private Date maxRegistrationDate;
    private String address;

    public OrganizationSearchCriteria() {

    }

    public Long getBin() {
        return bin;
    }

    public void setBin(Long bin) {
        this.bin = bin;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public TaxesCommittee getTaxesCommittee() {
        return taxesCommittee;
    }

    public void setTaxesCommittee(TaxesCommittee taxesCommittee) {
        this.taxesCommittee = taxesCommittee;
    }

    public OrganizationType getOrganizationType() {
        return organizationType;
    }

    public void setOrganizationType(OrganizationType organizationType) {
        this.organizationType = organizationType;
    }

    public EconomicActivity getPrimaryEconomicActivity() {
        return primaryEconomicActivity;
    }

    public void setPrimaryEconomicActivity(EconomicActivity primaryEconomicActivity) {
        this.primaryEconomicActivity = primaryEconomicActivity;
    }

    public List<EconomicActivity> getPermittedEconomicActivities() {
        return permittedEconomicActivities;
    }

    public void setPermittedEconomicActivities(List<EconomicActivity> permittedEconomicActivities) {
        this.permittedEconomicActivities = permittedEconomicActivities;
    }

    public Integer getNumberOfEmployees() {
        return numberOfEmployees;
    }

    public void setNumberOfEmployees(Integer numberOfEmployees) {
        this.numberOfEmployees = numberOfEmployees;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Integer getMinNumberOfEmployees() {
        return minNumberOfEmployees;
    }

    public void setMinNumberOfEmployees(Integer minNumberOfEmployees) {
        this.minNumberOfEmployees = minNumberOfEmployees;
    }

    public Integer getMaxNumberOfEmployees() {
        return maxNumberOfEmployees;
    }

    public void setMaxNumberOfEmployees(Integer maxNumberOfEmployees) {
        this.maxNumberOfEmployees = maxNumberOfEmployees;
    }

    public Date getMinRegistrationDate() {
        return minRegistrationDate;
    }

    public void setMinRegistrationDate(Date minRegistrationDate) {
        this.minRegistrationDate = minRegistrationDate;
    }

    public Date getMaxRegistrationDate() {
        return maxRegistrationDate;
    }

    public void setMaxRegistrationDate(Date maxRegistrationDate) {
        this.maxRegistrationDate = maxRegistrationDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
