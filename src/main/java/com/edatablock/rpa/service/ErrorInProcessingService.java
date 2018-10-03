package com.edatablock.rpa.service;

import com.edatablock.rpa.service.dto.ErrorInProcessingDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing ErrorInProcessing.
 */
public interface ErrorInProcessingService {

    /**
     * Save a errorInProcessing.
     *
     * @param errorInProcessingDTO the entity to save
     * @return the persisted entity
     */
    ErrorInProcessingDTO save(ErrorInProcessingDTO errorInProcessingDTO);

    /**
     * Get all the errorInProcessings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ErrorInProcessingDTO> findAll(Pageable pageable);


    /**
     * Get the "id" errorInProcessing.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ErrorInProcessingDTO> findOne(Long id);

    /**
     * Delete the "id" errorInProcessing.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
