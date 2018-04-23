package org.paperplane.organizationsregister.domain.search;

public class TaxesCommitteeSearchCriteria {
    private String name;
    private String address;

    public TaxesCommitteeSearchCriteria() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
