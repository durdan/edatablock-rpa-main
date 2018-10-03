package com.edatablock.rpa.web.rest;

import com.edatablock.rpa.EdatablockrpamainApp;

import com.edatablock.rpa.domain.ErrorInProcessing;
import com.edatablock.rpa.repository.ErrorInProcessingRepository;
import com.edatablock.rpa.service.ErrorInProcessingService;
import com.edatablock.rpa.service.dto.ErrorInProcessingDTO;
import com.edatablock.rpa.service.mapper.ErrorInProcessingMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.edatablock.rpa.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ErrorInProcessingResource REST controller.
 *
 * @see ErrorInProcessingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EdatablockrpamainApp.class)
public class ErrorInProcessingResourceIntTest {

    private static final String DEFAULT_ERROR_CODE = "AAAAAAAAAA";
    private static final String UPDATED_ERROR_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PROCESS_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_TYPE = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_EXCEPTION = "AAAAAAAAAA";
    private static final String UPDATED_EXCEPTION = "BBBBBBBBBB";

    private static final String DEFAULT_PROCESS_BY = "AAAAAAAAAA";
    private static final String UPDATED_PROCESS_BY = "BBBBBBBBBB";

    private static final Integer DEFAULT_PROCESS_ID = 1;
    private static final Integer UPDATED_PROCESS_ID = 2;

    @Autowired
    private ErrorInProcessingRepository errorInProcessingRepository;

    @Autowired
    private ErrorInProcessingMapper errorInProcessingMapper;
    
    @Autowired
    private ErrorInProcessingService errorInProcessingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restErrorInProcessingMockMvc;

    private ErrorInProcessing errorInProcessing;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ErrorInProcessingResource errorInProcessingResource = new ErrorInProcessingResource(errorInProcessingService);
        this.restErrorInProcessingMockMvc = MockMvcBuilders.standaloneSetup(errorInProcessingResource)
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
    public static ErrorInProcessing createEntity(EntityManager em) {
        ErrorInProcessing errorInProcessing = new ErrorInProcessing()
            .errorCode(DEFAULT_ERROR_CODE)
            .description(DEFAULT_DESCRIPTION)
            .processType(DEFAULT_PROCESS_TYPE)
            .createDate(DEFAULT_CREATE_DATE)
            .exception(DEFAULT_EXCEPTION)
            .processBy(DEFAULT_PROCESS_BY)
            .processID(DEFAULT_PROCESS_ID);
        return errorInProcessing;
    }

    @Before
    public void initTest() {
        errorInProcessing = createEntity(em);
    }

    @Test
    @Transactional
    public void createErrorInProcessing() throws Exception {
        int databaseSizeBeforeCreate = errorInProcessingRepository.findAll().size();

        // Create the ErrorInProcessing
        ErrorInProcessingDTO errorInProcessingDTO = errorInProcessingMapper.toDto(errorInProcessing);
        restErrorInProcessingMockMvc.perform(post("/api/error-in-processings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorInProcessingDTO)))
            .andExpect(status().isCreated());

        // Validate the ErrorInProcessing in the database
        List<ErrorInProcessing> errorInProcessingList = errorInProcessingRepository.findAll();
        assertThat(errorInProcessingList).hasSize(databaseSizeBeforeCreate + 1);
        ErrorInProcessing testErrorInProcessing = errorInProcessingList.get(errorInProcessingList.size() - 1);
        assertThat(testErrorInProcessing.getErrorCode()).isEqualTo(DEFAULT_ERROR_CODE);
        assertThat(testErrorInProcessing.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testErrorInProcessing.getProcessType()).isEqualTo(DEFAULT_PROCESS_TYPE);
        assertThat(testErrorInProcessing.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testErrorInProcessing.getException()).isEqualTo(DEFAULT_EXCEPTION);
        assertThat(testErrorInProcessing.getProcessBy()).isEqualTo(DEFAULT_PROCESS_BY);
        assertThat(testErrorInProcessing.getProcessID()).isEqualTo(DEFAULT_PROCESS_ID);
    }

    @Test
    @Transactional
    public void createErrorInProcessingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = errorInProcessingRepository.findAll().size();

        // Create the ErrorInProcessing with an existing ID
        errorInProcessing.setId(1L);
        ErrorInProcessingDTO errorInProcessingDTO = errorInProcessingMapper.toDto(errorInProcessing);

        // An entity with an existing ID cannot be created, so this API call must fail
        restErrorInProcessingMockMvc.perform(post("/api/error-in-processings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorInProcessingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ErrorInProcessing in the database
        List<ErrorInProcessing> errorInProcessingList = errorInProcessingRepository.findAll();
        assertThat(errorInProcessingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllErrorInProcessings() throws Exception {
        // Initialize the database
        errorInProcessingRepository.saveAndFlush(errorInProcessing);

        // Get all the errorInProcessingList
        restErrorInProcessingMockMvc.perform(get("/api/error-in-processings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(errorInProcessing.getId().intValue())))
            .andExpect(jsonPath("$.[*].errorCode").value(hasItem(DEFAULT_ERROR_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].processType").value(hasItem(DEFAULT_PROCESS_TYPE.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].exception").value(hasItem(DEFAULT_EXCEPTION.toString())))
            .andExpect(jsonPath("$.[*].processBy").value(hasItem(DEFAULT_PROCESS_BY.toString())))
            .andExpect(jsonPath("$.[*].processID").value(hasItem(DEFAULT_PROCESS_ID)));
    }
    
    @Test
    @Transactional
    public void getErrorInProcessing() throws Exception {
        // Initialize the database
        errorInProcessingRepository.saveAndFlush(errorInProcessing);

        // Get the errorInProcessing
        restErrorInProcessingMockMvc.perform(get("/api/error-in-processings/{id}", errorInProcessing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(errorInProcessing.getId().intValue()))
            .andExpect(jsonPath("$.errorCode").value(DEFAULT_ERROR_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.processType").value(DEFAULT_PROCESS_TYPE.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.exception").value(DEFAULT_EXCEPTION.toString()))
            .andExpect(jsonPath("$.processBy").value(DEFAULT_PROCESS_BY.toString()))
            .andExpect(jsonPath("$.processID").value(DEFAULT_PROCESS_ID));
    }

    @Test
    @Transactional
    public void getNonExistingErrorInProcessing() throws Exception {
        // Get the errorInProcessing
        restErrorInProcessingMockMvc.perform(get("/api/error-in-processings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateErrorInProcessing() throws Exception {
        // Initialize the database
        errorInProcessingRepository.saveAndFlush(errorInProcessing);

        int databaseSizeBeforeUpdate = errorInProcessingRepository.findAll().size();

        // Update the errorInProcessing
        ErrorInProcessing updatedErrorInProcessing = errorInProcessingRepository.findById(errorInProcessing.getId()).get();
        // Disconnect from session so that the updates on updatedErrorInProcessing are not directly saved in db
        em.detach(updatedErrorInProcessing);
        updatedErrorInProcessing
            .errorCode(UPDATED_ERROR_CODE)
            .description(UPDATED_DESCRIPTION)
            .processType(UPDATED_PROCESS_TYPE)
            .createDate(UPDATED_CREATE_DATE)
            .exception(UPDATED_EXCEPTION)
            .processBy(UPDATED_PROCESS_BY)
            .processID(UPDATED_PROCESS_ID);
        ErrorInProcessingDTO errorInProcessingDTO = errorInProcessingMapper.toDto(updatedErrorInProcessing);

        restErrorInProcessingMockMvc.perform(put("/api/error-in-processings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorInProcessingDTO)))
            .andExpect(status().isOk());

        // Validate the ErrorInProcessing in the database
        List<ErrorInProcessing> errorInProcessingList = errorInProcessingRepository.findAll();
        assertThat(errorInProcessingList).hasSize(databaseSizeBeforeUpdate);
        ErrorInProcessing testErrorInProcessing = errorInProcessingList.get(errorInProcessingList.size() - 1);
        assertThat(testErrorInProcessing.getErrorCode()).isEqualTo(UPDATED_ERROR_CODE);
        assertThat(testErrorInProcessing.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testErrorInProcessing.getProcessType()).isEqualTo(UPDATED_PROCESS_TYPE);
        assertThat(testErrorInProcessing.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testErrorInProcessing.getException()).isEqualTo(UPDATED_EXCEPTION);
        assertThat(testErrorInProcessing.getProcessBy()).isEqualTo(UPDATED_PROCESS_BY);
        assertThat(testErrorInProcessing.getProcessID()).isEqualTo(UPDATED_PROCESS_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingErrorInProcessing() throws Exception {
        int databaseSizeBeforeUpdate = errorInProcessingRepository.findAll().size();

        // Create the ErrorInProcessing
        ErrorInProcessingDTO errorInProcessingDTO = errorInProcessingMapper.toDto(errorInProcessing);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restErrorInProcessingMockMvc.perform(put("/api/error-in-processings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(errorInProcessingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ErrorInProcessing in the database
        List<ErrorInProcessing> errorInProcessingList = errorInProcessingRepository.findAll();
        assertThat(errorInProcessingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteErrorInProcessing() throws Exception {
        // Initialize the database
        errorInProcessingRepository.saveAndFlush(errorInProcessing);

        int databaseSizeBeforeDelete = errorInProcessingRepository.findAll().size();

        // Get the errorInProcessing
        restErrorInProcessingMockMvc.perform(delete("/api/error-in-processings/{id}", errorInProcessing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ErrorInProcessing> errorInProcessingList = errorInProcessingRepository.findAll();
        assertThat(errorInProcessingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ErrorInProcessing.class);
        ErrorInProcessing errorInProcessing1 = new ErrorInProcessing();
        errorInProcessing1.setId(1L);
        ErrorInProcessing errorInProcessing2 = new ErrorInProcessing();
        errorInProcessing2.setId(errorInProcessing1.getId());
        assertThat(errorInProcessing1).isEqualTo(errorInProcessing2);
        errorInProcessing2.setId(2L);
        assertThat(errorInProcessing1).isNotEqualTo(errorInProcessing2);
        errorInProcessing1.setId(null);
        assertThat(errorInProcessing1).isNotEqualTo(errorInProcessing2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ErrorInProcessingDTO.class);
        ErrorInProcessingDTO errorInProcessingDTO1 = new ErrorInProcessingDTO();
        errorInProcessingDTO1.setId(1L);
        ErrorInProcessingDTO errorInProcessingDTO2 = new ErrorInProcessingDTO();
        assertThat(errorInProcessingDTO1).isNotEqualTo(errorInProcessingDTO2);
        errorInProcessingDTO2.setId(errorInProcessingDTO1.getId());
        assertThat(errorInProcessingDTO1).isEqualTo(errorInProcessingDTO2);
        errorInProcessingDTO2.setId(2L);
        assertThat(errorInProcessingDTO1).isNotEqualTo(errorInProcessingDTO2);
        errorInProcessingDTO1.setId(null);
        assertThat(errorInProcessingDTO1).isNotEqualTo(errorInProcessingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(errorInProcessingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(errorInProcessingMapper.fromId(null)).isNull();
    }
}
