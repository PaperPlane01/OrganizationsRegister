package org.paperplane.organizationsregister.domain.search;

import org.paperplane.organizationsregister.domain.FinancialAccount;
import org.paperplane.organizationsregister.domain.Organization;

import javax.persistence.criteria.CriteriaBuilder;
import java.math.BigDecimal;

public class FinancialStatisticsSearchCriteria {
    private Integer id;
    private Organization organization;
    private FinancialAccount financialAccount;
    private String attribute;
    private int year;
    private Byte quarter;
    private BigDecimal minSum;
    private BigDecimal maxSum;

    public FinancialStatisticsSearchCriteria() {
    }

    public FinancialAccount getFinancialAccount() {
        return financialAccount;
    }

    public void setFinancialAccount(FinancialAccount financialAccount) {
        this.financialAccount = financialAccount;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Byte getQuarter() {
        return quarter;
    }

    public void setQuarter(byte quarter) {
        this.quarter = quarter;
    }

    public BigDecimal getMinSum() {
        return minSum;
    }

    public void setMinSum(BigDecimal minSum) {
        this.minSum = minSum;
    }

    public BigDecimal getMaxSum() {
        return maxSum;
    }

    public void setMaxSum(BigDecimal maxSum) {
        this.maxSum = maxSum;
    }
}
