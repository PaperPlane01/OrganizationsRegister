package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;
import org.paperplane.organizationsregister.domain.Organization;

import java.util.List;

public interface BankCustomQueriesCaller {
    List<Organization> findOrganizationsServedByBank(Bank bank);
    List<Bank> findByCriteria(BankSearchCriteria searchCriteria);
}
