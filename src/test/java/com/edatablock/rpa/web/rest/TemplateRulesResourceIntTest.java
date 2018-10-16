package com.edatablock.rpa.web.rest;

import com.edatablock.rpa.EdatablockrpamainApp;

import com.edatablock.rpa.domain.TemplateRules;
import com.edatablock.rpa.repository.TemplateRulesRepository;
import com.edatablock.rpa.service.TemplateRulesService;
import com.edatablock.rpa.service.dto.TemplateRulesDTO;
import com.edatablock.rpa.service.mapper.TemplateRulesMapper;
import com.edatablock.rpa.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.edatablock.rpa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TemplateRulesResource REST controller.
 *
 * @see TemplateRulesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EdatablockrpamainApp.class)
public class TemplateRulesResourceIntTest {

    private static final Integer DEFAULT_RULE_SEQUENCE = 1;
    private static final Integer UPDATED_RULE_SEQUENCE = 2;

    private static final String DEFAULT_LOOKUP_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_LOOKUP_PLACE = "BBBBBBBBBB";

    private static final String DEFAULT_OPERATOR = "AAAAAAAAAA";
    private static final String UPDATED_OPERATOR = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_JOIN_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_JOIN_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TemplateRulesRepository templateRulesRepository;

    @Autowired
    private TemplateRulesMapper templateRulesMapper;
    
    @Autowired
    private TemplateRulesService templateRulesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTemplateRulesMockMvc;

    private TemplateRules templateRules;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TemplateRulesResource templateRulesResource = new TemplateRulesResource(templateRulesService);
        this.restTemplateRulesMockMvc = MockMvcBuilders.standaloneSetup(templateRulesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TemplateRules createEntity(EntityManager em) {
        TemplateRules templateRules = new TemplateRules()
            .ruleSequence(DEFAULT_RULE_SEQUENCE)
            .lookupPlace(DEFAULT_LOOKUP_PLACE)
            .operator(DEFAULT_OPERATOR)
            .value(DEFAULT_VALUE)
            .joinField(DEFAULT_JOIN_FIELD)
            .description(DEFAULT_DESCRIPTION);
        return templateRules;
    }

    @Before
    public void initTest() {
        templateRules = createEntity(em);
    }

    @Test
    @Transactional
    public void createTemplateRules() throws Exception {
        int databaseSizeBeforeCreate = templateRulesRepository.findAll().size();

        // Create the TemplateRules
        TemplateRulesDTO templateRulesDTO = templateRulesMapper.toDto(templateRules);
        restTemplateRulesMockMvc.perform(post("/api/template-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateRulesDTO)))
            .andExpect(status().isCreated());

        // Validate the TemplateRules in the database
        List<TemplateRules> templateRulesList = templateRulesRepository.findAll();
        assertThat(templateRulesList).hasSize(databaseSizeBeforeCreate + 1);
        TemplateRules testTemplateRules = templateRulesList.get(templateRulesList.size() - 1);
        assertThat(testTemplateRules.getRuleSequence()).isEqualTo(DEFAULT_RULE_SEQUENCE);
        assertThat(testTemplateRules.getLookupPlace()).isEqualTo(DEFAULT_LOOKUP_PLACE);
        assertThat(testTemplateRules.getOperator()).isEqualTo(DEFAULT_OPERATOR);
        assertThat(testTemplateRules.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testTemplateRules.getJoinField()).isEqualTo(DEFAULT_JOIN_FIELD);
        assertThat(testTemplateRules.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTemplateRulesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = templateRulesRepository.findAll().size();

        // Create the TemplateRules with an existing ID
        templateRules.setId(1L);
        TemplateRulesDTO templateRulesDTO = templateRulesMapper.toDto(templateRules);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemplateRulesMockMvc.perform(post("/api/template-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateRulesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TemplateRules in the database
        List<TemplateRules> templateRulesList = templateRulesRepository.findAll();
        assertThat(templateRulesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTemplateRules() throws Exception {
        // Initialize the database
        templateRulesRepository.saveAndFlush(templateRules);

        // Get all the templateRulesList
        restTemplateRulesMockMvc.perform(get("/api/template-rules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(templateRules.getId().intValue())))
            .andExpect(jsonPath("$.[*].ruleSequence").value(hasItem(DEFAULT_RULE_SEQUENCE)))
            .andExpect(jsonPath("$.[*].lookupPlace").value(hasItem(DEFAULT_LOOKUP_PLACE.toString())))
            .andExpect(jsonPath("$.[*].operator").value(hasItem(DEFAULT_OPERATOR.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].joinField").value(hasItem(DEFAULT_JOIN_FIELD.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getTemplateRules() throws Exception {
        // Initialize the database
        templateRulesRepository.saveAndFlush(templateRules);

        // Get the templateRules
        restTemplateRulesMockMvc.perform(get("/api/template-rules/{id}", templateRules.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(templateRules.getId().intValue()))
            .andExpect(jsonPath("$.ruleSequence").value(DEFAULT_RULE_SEQUENCE))
            .andExpect(jsonPath("$.lookupPlace").value(DEFAULT_LOOKUP_PLACE.toString()))
            .andExpect(jsonPath("$.operator").value(DEFAULT_OPERATOR.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.joinField").value(DEFAULT_JOIN_FIELD.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTemplateRules() throws Exception {
        // Get the templateRules
        restTemplateRulesMockMvc.perform(get("/api/template-rules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTemplateRules() throws Exception {
        // Initialize the database
        templateRulesRepository.saveAndFlush(templateRules);

        int databaseSizeBeforeUpdate = templateRulesRepository.findAll().size();

        // Update the templateRules
        TemplateRules updatedTemplateRules = templateRulesRepository.findById(templateRules.getId()).get();
        // Disconnect from session so that the updates on updatedTemplateRules are not directly saved in db
        em.detach(updatedTemplateRules);
        updatedTemplateRules
            .ruleSequence(UPDATED_RULE_SEQUENCE)
            .lookupPlace(UPDATED_LOOKUP_PLACE)
            .operator(UPDATED_OPERATOR)
            .value(UPDATED_VALUE)
            .joinField(UPDATED_JOIN_FIELD)
            .description(UPDATED_DESCRIPTION);
        TemplateRulesDTO templateRulesDTO = templateRulesMapper.toDto(updatedTemplateRules);

        restTemplateRulesMockMvc.perform(put("/api/template-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateRulesDTO)))
            .andExpect(status().isOk());

        // Validate the TemplateRules in the database
        List<TemplateRules> templateRulesList = templateRulesRepository.findAll();
        assertThat(templateRulesList).hasSize(databaseSizeBeforeUpdate);
        TemplateRules testTemplateRules = templateRulesList.get(templateRulesList.size() - 1);
        assertThat(testTemplateRules.getRuleSequence()).isEqualTo(UPDATED_RULE_SEQUENCE);
        assertThat(testTemplateRules.getLookupPlace()).isEqualTo(UPDATED_LOOKUP_PLACE);
        assertThat(testTemplateRules.getOperator()).isEqualTo(UPDATED_OPERATOR);
        assertThat(testTemplateRules.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testTemplateRules.getJoinField()).isEqualTo(UPDATED_JOIN_FIELD);
        assertThat(testTemplateRules.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTemplateRules() throws Exception {
        int databaseSizeBeforeUpdate = templateRulesRepository.findAll().size();

        // Create the TemplateRules
        TemplateRulesDTO templateRulesDTO = templateRulesMapper.toDto(templateRules);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTemplateRulesMockMvc.perform(put("/api/template-rules")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(templateRulesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TemplateRules in the database
        List<TemplateRules> templateRulesList = templateRulesRepository.findAll();
        assertThat(templateRulesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTemplateRules() throws Exception {
        // Initialize the database
        templateRulesRepository.saveAndFlush(templateRules);

        int databaseSizeBeforeDelete = templateRulesRepository.findAll().size();

        // Get the templateRules
        restTemplateRulesMockMvc.perform(delete("/api/template-rules/{id}", templateRules.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TemplateRules> templateRulesList = templateRulesRepository.findAll();
        assertThat(templateRulesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateRules.class);
        TemplateRules templateRules1 = new TemplateRules();
        templateRules1.setId(1L);
        TemplateRules templateRules2 = new TemplateRules();
        templateRules2.setId(templateRules1.getId());
        assertThat(templateRules1).isEqualTo(templateRules2);
        templateRules2.setId(2L);
        assertThat(templateRules1).isNotEqualTo(templateRules2);
        templateRules1.setId(null);
        assertThat(templateRules1).isNotEqualTo(templateRules2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TemplateRulesDTO.class);
        TemplateRulesDTO templateRulesDTO1 = new TemplateRulesDTO();
        templateRulesDTO1.setId(1L);
        TemplateRulesDTO templateRulesDTO2 = new TemplateRulesDTO();
        assertThat(templateRulesDTO1).isNotEqualTo(templateRulesDTO2);
        templateRulesDTO2.setId(templateRulesDTO1.getId());
        assertThat(templateRulesDTO1).isEqualTo(templateRulesDTO2);
        templateRulesDTO2.setId(2L);
        assertThat(templateRulesDTO1).isNotEqualTo(templateRulesDTO2);
        templateRulesDTO1.setId(null);
        assertThat(templateRulesDTO1).isNotEqualTo(templateRulesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(templateRulesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(templateRulesMapper.fromId(null)).isNull();
    }
}
