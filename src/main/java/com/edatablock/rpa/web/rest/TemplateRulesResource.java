package com.edatablock.rpa.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edatablock.rpa.service.TemplateRulesService;
import com.edatablock.rpa.web.rest.errors.BadRequestAlertException;
import com.edatablock.rpa.web.rest.util.HeaderUtil;
import com.edatablock.rpa.web.rest.util.PaginationUtil;
import com.edatablock.rpa.service.dto.TemplateRulesDTO;
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
 * REST controller for managing TemplateRules.
 */
@RestController
@RequestMapping("/api")
public class TemplateRulesResource {

    private final Logger log = LoggerFactory.getLogger(TemplateRulesResource.class);

    private static final String ENTITY_NAME = "templateRules";

    private final TemplateRulesService templateRulesService;

    public TemplateRulesResource(TemplateRulesService templateRulesService) {
        this.templateRulesService = templateRulesService;
    }

    /**
     * POST  /template-rules : Create a new templateRules.
     *
     * @param templateRulesDTO the templateRulesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new templateRulesDTO, or with status 400 (Bad Request) if the templateRules has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/template-rules")
    @Timed
    public ResponseEntity<TemplateRulesDTO> createTemplateRules(@RequestBody TemplateRulesDTO templateRulesDTO) throws URISyntaxException {
        log.debug("REST request to save TemplateRules : {}", templateRulesDTO);
        if (templateRulesDTO.getId() != null) {
            throw new BadRequestAlertException("A new templateRules cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TemplateRulesDTO result = templateRulesService.save(templateRulesDTO);
        return ResponseEntity.created(new URI("/api/template-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /template-rules : Updates an existing templateRules.
     *
     * @param templateRulesDTO the templateRulesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated templateRulesDTO,
     * or with status 400 (Bad Request) if the templateRulesDTO is not valid,
     * or with status 500 (Internal Server Error) if the templateRulesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/template-rules")
    @Timed
    public ResponseEntity<TemplateRulesDTO> updateTemplateRules(@RequestBody TemplateRulesDTO templateRulesDTO) throws URISyntaxException {
        log.debug("REST request to update TemplateRules : {}", templateRulesDTO);
        if (templateRulesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TemplateRulesDTO result = templateRulesService.save(templateRulesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, templateRulesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /template-rules : get all the templateRules.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of templateRules in body
     */
    @GetMapping("/template-rules")
    @Timed
    public ResponseEntity<List<TemplateRulesDTO>> getAllTemplateRules(Pageable pageable) {
        log.debug("REST request to get a page of TemplateRules");
        Page<TemplateRulesDTO> page = templateRulesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/template-rules");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /template-rules/:id : get the "id" templateRules.
     *
     * @param id the id of the templateRulesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the templateRulesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/template-rules/{id}")
    @Timed
    public ResponseEntity<TemplateRulesDTO> getTemplateRules(@PathVariable Long id) {
        log.debug("REST request to get TemplateRules : {}", id);
        Optional<TemplateRulesDTO> templateRulesDTO = templateRulesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(templateRulesDTO);
    }

    /**
     * DELETE  /template-rules/:id : delete the "id" templateRules.
     *
     * @param id the id of the templateRulesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/template-rules/{id}")
    @Timed
    public ResponseEntity<Void> deleteTemplateRules(@PathVariable Long id) {
        log.debug("REST request to delete TemplateRules : {}", id);
        templateRulesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
