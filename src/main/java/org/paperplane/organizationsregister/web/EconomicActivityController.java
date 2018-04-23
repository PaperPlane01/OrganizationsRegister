package org.paperplane.organizationsregister.web;

import org.paperplane.organizationsregister.annotation.AssertEntityExists;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.annotation.RequiresToken;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.search.EconomicActivitySearchCriteria;
import org.paperplane.organizationsregister.service.EconomicActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/economic-activities")
public class EconomicActivityController {

    private EconomicActivityService economicActivityService;

    @Autowired
    public EconomicActivityController(EconomicActivityService economicActivityService) {
        this.economicActivityService = economicActivityService;
    }

    @RequestMapping(method = RequestMethod.GET, params = {"nameContains"})
    @ResponseBody
    public List<EconomicActivity> findByNameContains(@RequestParam("nameContains") String nameContains) {
        return economicActivityService.findByNameContains(nameContains);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @AssertEntityExists
    @ResponseBody
    public EconomicActivity findById(@PathVariable("id") @EntityIdentifier(entityClass = EconomicActivity.class) int id) {
        return economicActivityService.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    @RequiresToken
    @RequiresRole(anyOf = {"admin"})
    public void save(@RequestBody EconomicActivity economicActivity,
                     @RequestHeader(value = "token", required = false) String tokenValue) {
        economicActivityService.save(economicActivity);
    }

    @RequestMapping(method = RequestMethod.POST, value = {"/search"})
    @ResponseBody
    public List<EconomicActivity> findByCriteria(@RequestBody EconomicActivitySearchCriteria searchCriteria) {
        return  economicActivityService.findByCriteria(searchCriteria);
    }
}
