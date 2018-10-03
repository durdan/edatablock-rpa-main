package com.edatablock.rpa.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ErrorInProcessing entity.
 */
public class ErrorInProcessingDTO implements Serializable {

    private Long id;

    private String errorCode;

    private String description;

    private String processType;

    private Instant createDate;

    private String exception;

    private String processBy;

    private Integer processID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getProcessBy() {
        return processBy;
    }

    public void setProcessBy(String processBy) {
        this.processBy = processBy;
    }

    public Integer getProcessID() {
        return processID;
    }

    public void setProcessID(Integer processID) {
        this.processID = processID;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ErrorInProcessingDTO errorInProcessingDTO = (ErrorInProcessingDTO) o;
        if (errorInProcessingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), errorInProcessingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ErrorInProcessingDTO{" +
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
