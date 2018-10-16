package com.edatablock.rpa.service.impl;

import com.edatablock.rpa.service.TemplateRulesService;
import com.edatablock.rpa.domain.TemplateRules;
import com.edatablock.rpa.repository.TemplateRulesRepository;
import com.edatablock.rpa.service.dto.TemplateRulesDTO;
import com.edatablock.rpa.service.mapper.TemplateRulesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing TemplateRules.
 */
@Service
@Transactional
public class TemplateRulesServiceImpl implements TemplateRulesService {

    private final Logger log = LoggerFactory.getLogger(TemplateRulesServiceImpl.class);

    private final TemplateRulesRepository templateRulesRepository;

    private final TemplateRulesMapper templateRulesMapper;

    public TemplateRulesServiceImpl(TemplateRulesRepository templateRulesRepository, TemplateRulesMapper templateRulesMapper) {
        this.templateRulesRepository = templateRulesRepository;
        this.templateRulesMapper = templateRulesMapper;
    }

    /**
     * Save a templateRules.
     *
     * @param templateRulesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TemplateRulesDTO save(TemplateRulesDTO templateRulesDTO) {
        log.debug("Request to save TemplateRules : {}", templateRulesDTO);
        TemplateRules templateRules = templateRulesMapper.toEntity(templateRulesDTO);
        templateRules = templateRulesRepository.save(templateRules);
        return templateRulesMapper.toDto(templateRules);
    }

    /**
     * Get all the templateRules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TemplateRulesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TemplateRules");
        return templateRulesRepository.findAll(pageable)
            .map(templateRulesMapper::toDto);
    }


    /**
     * Get one templateRules by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TemplateRulesDTO> findOne(Long id) {
        log.debug("Request to get TemplateRules : {}", id);
        return templateRulesRepository.findById(id)
            .map(templateRulesMapper::toDto);
    }

    /**
     * Delete the templateRules by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TemplateRules : {}", id);
        templateRulesRepository.deleteById(id);
    }
}
