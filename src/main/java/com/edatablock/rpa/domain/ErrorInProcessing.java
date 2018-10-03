package com.edatablock.rpa.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A ErrorInProcessing.
 */
@Entity
@Table(name = "error_in_processing")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ErrorInProcessing implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "error_code")
    private String errorCode;

    @Column(name = "description")
    private String description;

    @Column(name = "process_type")
    private String processType;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "exception")
    private String exception;

    @Column(name = "process_by")
    private String processBy;

    @Column(name = "process_id")
    private Integer processID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public ErrorInProcessing errorCode(String errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getDescription() {
        return description;
    }

    public ErrorInProcessing description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProcessType() {
        return processType;
    }

    public ErrorInProcessing processType(String processType) {
        this.processType = processType;
        return this;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public ErrorInProcessing createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public String getException() {
        return exception;
    }

    public ErrorInProcessing exception(String exception) {
        this.exception = exception;
        return this;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getProcessBy() {
        return processBy;
    }

    public ErrorInProcessing processBy(String processBy) {
        this.processBy = processBy;
        return this;
    }

    public void setProcessBy(String processBy) {
        this.processBy = processBy;
    }

    public Integer getProcessID() {
        return processID;
    }

    public ErrorInProcessing processID(Integer processID) {
        this.processID = processID;
        return this;
    }

    public void setProcessID(Integer processID) {
        this.processID = processID;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ErrorInProcessing errorInProcessing = (ErrorInProcessing) o;
        if (errorInProcessing.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), errorInProcessing.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ErrorInProcessing{" +
            "id=" + getId() +
            ", errorCode='" + getErrorCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", processType='" + getProcessType() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", exception='" + getException() + "'" +
            ", processBy='" + getProcessBy() + "'" +
            ", processID=" + getProcessID() +
            "}";
    }
}
