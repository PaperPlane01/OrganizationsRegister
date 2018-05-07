package org.paperplane.organizationsregister.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "OrganizationsAndBanks")
public class BankAccount {

    @Id
    @Column(name = "bankAccountID")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "organizationBIN")
    private Organization organization;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "bankID")
    private Bank bank;

    public BankAccount() {
    }

    public BankAccount(Organization organization, Bank bank) {
        this.organization = organization;
        this.bank = bank;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Bank getBank() {
        return bank;
    }

    public void setBank(Bank bank) {
        this.bank = bank;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BankAccount that = (BankAccount) o;
        return id == that.id &&
                Objects.equals(organization, that.organization) &&
                Objects.equals(bank, that.bank);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, organization, bank);
    }
}
