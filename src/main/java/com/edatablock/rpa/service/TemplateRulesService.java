package com.edatablock.rpa.service;

import com.edatablock.rpa.service.dto.TemplateRulesDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing TemplateRules.
 */
public interface TemplateRulesService {

    /**
     * Save a templateRules.
     *
     * @param templateRulesDTO the entity to save
     * @return the persisted entity
     */
    TemplateRulesDTO save(TemplateRulesDTO templateRulesDTO);

    /**
     * Get all the templateRules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TemplateRulesDTO> findAll(Pageable pageable);


    /**
     * Get the "id" templateRules.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TemplateRulesDTO> findOne(Long id);

    /**
     * Delete the "id" templateRules.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
