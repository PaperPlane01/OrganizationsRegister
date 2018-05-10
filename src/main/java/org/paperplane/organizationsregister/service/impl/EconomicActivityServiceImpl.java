package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.EconomicActivityRepository;
import org.paperplane.organizationsregister.domain.EconomicActivity;
import org.paperplane.organizationsregister.domain.search.EconomicActivitySearchCriteria;
import org.paperplane.organizationsregister.service.EconomicActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EconomicActivityServiceImpl implements EconomicActivityService {

    @Autowired
    private EconomicActivityRepository economicActivityRepository;

    @Override
    public EconomicActivity save(EconomicActivity economicActivity) {
        return economicActivityRepository.save(economicActivity);
    }

    @Override
    public List<EconomicActivity> findByNameContains(String name) {
        return economicActivityRepository.findAllByNameContains(name);
    }

    @Override
    public EconomicActivity findById(int id) {
        return economicActivityRepository.findById(id);
    }

    @Override
    public List<EconomicActivity> findByCriteria(EconomicActivitySearchCriteria searchCriteria) {
        return economicActivityRepository.findByCriteria(searchCriteria);
    }

    @Override
    public EconomicActivity update(EconomicActivity economicActivity) {
        return economicActivityRepository.save(economicActivity);
    }

    @Override
    public boolean existsById(Integer id) {
        return economicActivityRepository.existsById(id);
    }
}
