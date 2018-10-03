package com.edatablock.rpa.service.impl;

import com.edatablock.rpa.service.ErrorInProcessingService;
import com.edatablock.rpa.domain.ErrorInProcessing;
import com.edatablock.rpa.repository.ErrorInProcessingRepository;
import com.edatablock.rpa.service.dto.ErrorInProcessingDTO;
import com.edatablock.rpa.service.mapper.ErrorInProcessingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ErrorInProcessing.
 */
@Service
@Transactional
public class ErrorInProcessingServiceImpl implements ErrorInProcessingService {

    private final Logger log = LoggerFactory.getLogger(ErrorInProcessingServiceImpl.class);

    private final ErrorInProcessingRepository errorInProcessingRepository;

    private final ErrorInProcessingMapper errorInProcessingMapper;

    public ErrorInProcessingServiceImpl(ErrorInProcessingRepository errorInProcessingRepository, ErrorInProcessingMapper errorInProcessingMapper) {
        this.errorInProcessingRepository = errorInProcessingRepository;
        this.errorInProcessingMapper = errorInProcessingMapper;
    }

    /**
     * Save a errorInProcessing.
     *
     * @param errorInProcessingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ErrorInProcessingDTO save(ErrorInProcessingDTO errorInProcessingDTO) {
        log.debug("Request to save ErrorInProcessing : {}", errorInProcessingDTO);
        ErrorInProcessing errorInProcessing = errorInProcessingMapper.toEntity(errorInProcessingDTO);
        errorInProcessing = errorInProcessingRepository.save(errorInProcessing);
        return errorInProcessingMapper.toDto(errorInProcessing);
    }

    /**
     * Get all the errorInProcessings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ErrorInProcessingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ErrorInProcessings");
        return errorInProcessingRepository.findAll(pageable)
            .map(errorInProcessingMapper::toDto);
    }


    /**
     * Get one errorInProcessing by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ErrorInProcessingDTO> findOne(Long id) {
        log.debug("Request to get ErrorInProcessing : {}", id);
        return errorInProcessingRepository.findById(id)
            .map(errorInProcessingMapper::toDto);
    }

    /**
     * Delete the errorInProcessing by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ErrorInProcessing : {}", id);
        errorInProcessingRepository.deleteById(id);
    }
}
