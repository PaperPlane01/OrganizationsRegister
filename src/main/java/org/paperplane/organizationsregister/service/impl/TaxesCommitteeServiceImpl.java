package org.paperplane.organizationsregister.service.impl;

import org.paperplane.organizationsregister.data.TaxesCommitteeRepository;
import org.paperplane.organizationsregister.domain.search.TaxesCommitteeSearchCriteria;
import org.paperplane.organizationsregister.domain.TaxesCommittee;
import org.paperplane.organizationsregister.service.TaxesCommitteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaxesCommitteeServiceImpl implements TaxesCommitteeService{

    private TaxesCommitteeRepository taxesCommitteeRepository;

    @Autowired
    public TaxesCommitteeServiceImpl(TaxesCommitteeRepository taxesCommitteeRepository) {
        this.taxesCommitteeRepository = taxesCommitteeRepository;
    }

    @Override
    public TaxesCommittee save(TaxesCommittee taxesCommittee) {
        return taxesCommitteeRepository.save(taxesCommittee);
    }

    @Override
    public TaxesCommittee findById(int id) {
        return taxesCommitteeRepository.findById(id);
    }

    @Override
    public List<TaxesCommittee> findByNameContains(String line) {
        return taxesCommitteeRepository.findAllByNameContains(line);
    }

    @Override
    public boolean existsById(Integer id) {
        return taxesCommitteeRepository.existsById(id);
    }

    @Override
    public List<TaxesCommittee> findByCriteria(TaxesCommitteeSearchCriteria searchCriteria) {
        return taxesCommitteeRepository.findByCriteria(searchCriteria);
    }

    @Override
    public TaxesCommittee update(TaxesCommittee taxesCommittee) {
        return taxesCommitteeRepository.save(taxesCommittee);
    }
}
