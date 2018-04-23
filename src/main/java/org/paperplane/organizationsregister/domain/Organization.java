package org.paperplane.organizationsregister.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Organization implements Comparable<Organization> {

    @Id
    private long bin;

    @NotNull
    @Size(min = 1, max = 80)
    private String fullName;

    @Size(min = 1, max = 50)
    private String shortName;

    @NotNull
    @Size(min = 1, max = 80)
    private String address;

    @NotNull
    @JoinColumn(name = "organizationTypeID")
    @ManyToOne(cascade = {CascadeType.MERGE})
    private OrganizationType organizationType;

    @NotNull
    @JoinColumn(name = "primaryEconomicActivityID")
    @ManyToOne(cascade = {CascadeType.MERGE})
    private EconomicActivity primaryEconomicActivity;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date registrationDate;

    @NotNull
    private int numberOfEmployees;

    @NotNull
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(name = "OrganizationsAndPermittedEconomicActivities",
            joinColumns = @JoinColumn(name = "organizationBIN"),
            inverseJoinColumns = @JoinColumn(name = "economicActivityID"))
    private List<EconomicActivity> permittedEconomicActivities;

    @NotNull
    @JoinColumn(name = "taxesCommitteeID")
    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE} )
    private TaxesCommittee taxesCommittee;

    @NotNull
    @Size(min = 1, max = 200)
    private String founder;

    @NotNull
    @Size(min = 1, max = 30)
    private String phoneNumber;

    public Organization() {
    }

    public Organization(long bin) {
        this.bin = bin;
    }

    public long getBin() {
        return bin;
    }

    public void setBin(long bin) {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public int getNumberOfEmployees() {
        return numberOfEmployees;
    }

    public void setNumberOfEmployees(int numberOfEmployees) {
        this.numberOfEmployees = numberOfEmployees;
    }

    public List<EconomicActivity> getPermittedEconomicActivities() {
        return permittedEconomicActivities;
    }

    public void setPermittedEconomicActivities(List<EconomicActivity> permittedEconomicActivities) {
        this.permittedEconomicActivities = permittedEconomicActivities;
    }

    public TaxesCommittee getTaxesCommittee() {
        return taxesCommittee;
    }

    public void setTaxesCommittee(TaxesCommittee taxesCommittee) {
        this.taxesCommittee = taxesCommittee;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Organization that = (Organization) o;
        return bin == that.bin &&
                numberOfEmployees == that.numberOfEmployees &&
                Objects.equal(fullName, that.fullName) &&
                Objects.equal(shortName, that.shortName) &&
                Objects.equal(address, that.address) &&
                Objects.equal(organizationType, that.organizationType) &&
                Objects.equal(primaryEconomicActivity, that.primaryEconomicActivity) &&
                Objects.equal(registrationDate, that.registrationDate) &&
                Objects.equal(permittedEconomicActivities, that.permittedEconomicActivities) &&
                Objects.equal(taxesCommittee, that.taxesCommittee) &&
                Objects.equal(founder, that.founder) &&
                Objects.equal(phoneNumber, that.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(bin, fullName, shortName, address, organizationType, primaryEconomicActivity, registrationDate, numberOfEmployees, permittedEconomicActivities, taxesCommittee, founder, phoneNumber);
    }

    @Override
    public int compareTo(Organization o) {
        return this.fullName.compareTo(o.fullName);
    }

}