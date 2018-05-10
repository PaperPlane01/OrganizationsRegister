package org.paperplane.organizationsregister.domain.search;

import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.Organization;

public class BankAccountSearchCriteria {
    private Long id;
    private Organization organization;
    private Bank bank;

    public BankAccountSearchCriteria() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
}
