package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.Organization;
import org.paperplane.organizationsregister.domain.search.BankSearchCriteria;
import org.paperplane.organizationsregister.domain.Bank;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface BankCustomQueriesCaller {
    List<Bank> findByCriteria(BankSearchCriteria searchCriteria);
    List<Map<Organization, Bank>> findBanksByOrganizationRegistrationDate(Date registrationDate);
}
