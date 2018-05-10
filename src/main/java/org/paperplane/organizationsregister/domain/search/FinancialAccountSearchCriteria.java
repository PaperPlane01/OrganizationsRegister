package org.paperplane.organizationsregister.domain.search;

import org.paperplane.organizationsregister.domain.Organization;

public class FinancialAccountSearchCriteria {
    private Integer id;
    private String name;

    public FinancialAccountSearchCriteria() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
