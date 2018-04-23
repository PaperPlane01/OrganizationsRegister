import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.runners.MockitoJUnitRunner;
import org.mockito.Mock;
import org.paperplane.organizationsregister.data.BankAccountRepository;
import org.paperplane.organizationsregister.data.OrganizationRepository;
import org.paperplane.organizationsregister.data.OrganizationTypeRepository;
import org.paperplane.organizationsregister.domain.*;
import org.paperplane.organizationsregister.service.OrganizationService;
import org.paperplane.organizationsregister.service.impl.OrganizationServiceImpl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class OrganizationServiceTest {
    @InjectMocks
    private OrganizationService organizationService = new OrganizationServiceImpl();

    @Mock
    private OrganizationTypeRepository organizationTypeRepository;

    @Mock
    private OrganizationRepository organizationRepository;

    @Mock
    private BankAccountRepository bankAccountRepository;

    private Long bin = 124794579412L;

    @Test
    public void testFindOrganizationByBin() {
        Assert.assertEquals(organization(), organizationService.findByBin(bin));
    }

    @Before
    public void setUp() {
        when(organizationRepository.findByBin(bin)).thenReturn(organization());
    }

    private Organization organization() {
        Organization organization = new Organization();
        organization.setBin(bin);
        organization.setFullName("organization");
        organization.setShortName("org");
        organization.setAddress("address");
        organization.setFounder("founder");
        organization.setPhoneNumber("555-35-35");
        organization.setNumberOfEmployees(500);
        organization.setRegistrationDate(registrationDate());
        organization.setOrganizationType(organizationType());
        organization.setPrimaryEconomicActivity(primaryEconomicActivity());
        organization.setPermittedEconomicActivities(permittedEconomicActivities());
        organization.setTaxesCommittee(taxesCommittee());
        return organization;
    }

    private Date registrationDate() {
        String stringDate = "15-01-2014";
        DateFormat dateFormat = new SimpleDateFormat("d-mm-yyyy");
        try {
            return dateFormat.parse(stringDate);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    private List<EconomicActivity> permittedEconomicActivities() {
        EconomicActivity economicActivity1 = new EconomicActivity();
        economicActivity1.setId(1);
        economicActivity1.setName("name1");

        EconomicActivity economicActivity2 = new EconomicActivity();
        economicActivity2.setId(2);
        economicActivity2.setName("name2");

        return Arrays.asList(economicActivity1, economicActivity2);
    }

    private EconomicActivity primaryEconomicActivity() {
        EconomicActivity economicActivity = new EconomicActivity();
        economicActivity.setId(1);
        economicActivity.setName("name1");
        return economicActivity;
    }

    private OrganizationType organizationType() {
        OrganizationType organizationType = new OrganizationType();
        organizationType.setId(1);
        organizationType.setName("name");
        return organizationType;
    }

    private TaxesCommittee taxesCommittee() {
        TaxesCommittee taxesCommittee = new TaxesCommittee();
        taxesCommittee.setId(1);
        taxesCommittee.setAddress("address");
        taxesCommittee.setName("name");
        return taxesCommittee;
    }
}
