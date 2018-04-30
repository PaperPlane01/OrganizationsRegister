package org.paperplane.organizationsregister.domain;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
public class FinancialStatisticsByQuarter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "organizationBIN")
    @NotNull
    private Organization organization;

    @NotNull
    @Min(1)
    @Max(4)
    private int quarter;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "financialAccountID")
    private FinancialAccount financialAccount;

    @NotNull
    @Min(1900)
    private int year;

    @NotNull
    private BigDecimal sum;

    @NotNull
    @Size(min = 1, max = 10)
    private String attribute;

    public FinancialStatisticsByQuarter() {
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public int getQuarter() {
        return quarter;
    }

    public void setQuarter(int quarter) {
        this.quarter = quarter;
    }

    public FinancialAccount getFinancialAccount() {
        return financialAccount;
    }

    public void setFinancialAccount(FinancialAccount financialAccount) {
        this.financialAccount = financialAccount;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public BigDecimal getSum() {
        return sum;
    }

    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FinancialStatisticsByQuarter that = (FinancialStatisticsByQuarter) o;
        return this.id == that.id &&
                quarter == that.quarter &&
                year == that.year &&
                Objects.equals(organization, that.organization) &&
                Objects.equals(financialAccount, that.financialAccount) &&
                Objects.equals(sum, that.sum) &&
                Objects.equals(attribute, that.attribute);
    }

    @Override
    public int hashCode() {
        return Objects.hash(organization, quarter, financialAccount, year, sum, attribute);
    }
}
