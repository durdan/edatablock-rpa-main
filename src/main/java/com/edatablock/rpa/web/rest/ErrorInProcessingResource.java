package com.edatablock.rpa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edatablock.rpa.service.ErrorInProcessingService;
import com.edatablock.rpa.web.rest.errors.BadRequestAlertException;
import com.edatablock.rpa.web.rest.util.HeaderUtil;
import com.edatablock.rpa.web.rest.util.PaginationUtil;
import com.edatablock.rpa.service.dto.ErrorInProcessingDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ErrorInProcessing.
 */
@RestController
@RequestMapping("/api")
public class ErrorInProcessingResource {

    private final Logger log = LoggerFactory.getLogger(ErrorInProcessingResource.class);

    private static final String ENTITY_NAME = "errorInProcessing";

    private final ErrorInProcessingService errorInProcessingService;

    public ErrorInProcessingResource(ErrorInProcessingService errorInProcessingService) {
        this.errorInProcessingService = errorInProcessingService;
    }

    /**
     * POST  /error-in-processings : Create a new errorInProcessing.
     *
     * @param errorInProcessingDTO the errorInProcessingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new errorInProcessingDTO, or with status 400 (Bad Request) if the errorInProcessing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/error-in-processings")
    @Timed
    public ResponseEntity<ErrorInProcessingDTO> createErrorInProcessing(@RequestBody ErrorInProcessingDTO errorInProcessingDTO) throws URISyntaxException {
        log.debug("REST request to save ErrorInProcessing : {}", errorInProcessingDTO);
        if (errorInProcessingDTO.getId() != null) {
            throw new BadRequestAlertException("A new errorInProcessing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ErrorInProcessingDTO result = errorInProcessingService.save(errorInProcessingDTO);
        return ResponseEntity.created(new URI("/api/error-in-processings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /error-in-processings : Updates an existing errorInProcessing.
     *
     * @param errorInProcessingDTO the errorInProcessingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated errorInProcessingDTO,
     * or with status 400 (Bad Request) if the errorInProcessingDTO is not valid,
     * or with status 500 (Internal Server Error) if the errorInProcessingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/error-in-processings")
    @Timed
    public ResponseEntity<ErrorInProcessingDTO> updateErrorInProcessing(@RequestBody ErrorInProcessingDTO errorInProcessingDTO) throws URISyntaxException {
        log.debug("REST request to update ErrorInProcessing : {}", errorInProcessingDTO);
        if (errorInProcessingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ErrorInProcessingDTO result = errorInProcessingService.save(errorInProcessingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, errorInProcessingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /error-in-processings : get all the errorInProcessings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of errorInProcessings in body
     */
    @GetMapping("/error-in-processings")
    @Timed
    public ResponseEntity<List<ErrorInProcessingDTO>> getAllErrorInProcessings(Pageable pageable) {
        log.debug("REST request to get a page of ErrorInProcessings");
        Page<ErrorInProcessingDTO> page = errorInProcessingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/error-in-processings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /error-in-processings/:id : get the "id" errorInProcessing.
     *
     * @param id the id of the errorInProcessingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the errorInProcessingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/error-in-processings/{id}")
    @Timed
    public ResponseEntity<ErrorInProcessingDTO> getErrorInProcessing(@PathVariable Long id) {
        log.debug("REST request to get ErrorInProcessing : {}", id);
        Optional<ErrorInProcessingDTO> errorInProcessingDTO = errorInProcessingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(errorInProcessingDTO);
    }

    /**
     * DELETE  /error-in-processings/:id : delete the "id" errorInProcessing.
     *
     * @param id the id of the errorInProcessingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/error-in-processings/{id}")
    @Timed
    public ResponseEntity<Void> deleteErrorInProcessing(@PathVariable Long id) {
        log.debug("REST request to delete ErrorInProcessing : {}", id);
        errorInProcessingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
