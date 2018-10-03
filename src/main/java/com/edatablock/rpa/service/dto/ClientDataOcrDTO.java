package com.edatablock.rpa.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ClientDataOcr entity.
 */
public class ClientDataOcrDTO implements Serializable {

    private Long id;

    private String emailMessageId;

    private String extractOcrDataJson;

    private String searchId;

    private String clientEmailAddress;

    private String attachmentfileName;

    private Long inputTemplateId;

    private String inputTemplateTemplateName;

    private Long transactionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailMessageId() {
        return emailMessageId;
    }

    public void setEmailMessageId(String emailMessageId) {
        this.emailMessageId = emailMessageId;
    }

    public String getExtractOcrDataJson() {
        return extractOcrDataJson;
    }

    public void setExtractOcrDataJson(String extractOcrDataJson) {
        this.extractOcrDataJson = extractOcrDataJson;
    }

    public String getSearchId() {
        return searchId;
    }

    public void setSearchId(String searchId) {
        this.searchId = searchId;
    }

    public String getClientEmailAddress() {
        return clientEmailAddress;
    }

    public void setClientEmailAddress(String clientEmailAddress) {
        this.clientEmailAddress = clientEmailAddress;
    }

    public String getAttachmentfileName() {
        return attachmentfileName;
    }

    public void setAttachmentfileName(String attachmentfileName) {
        this.attachmentfileName = attachmentfileName;
    }

    public Long getInputTemplateId() {
        return inputTemplateId;
    }

    public void setInputTemplateId(Long inputTemplateId) {
        this.inputTemplateId = inputTemplateId;
    }

    public String getInputTemplateTemplateName() {
        return inputTemplateTemplateName;
    }

    public void setInputTemplateTemplateName(String inputTemplateTemplateName) {
        this.inputTemplateTemplateName = inputTemplateTemplateName;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClientDataOcrDTO clientDataOcrDTO = (ClientDataOcrDTO) o;
        if (clientDataOcrDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientDataOcrDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientDataOcrDTO{" +
            "id=" + getId() +
            ", emailMessageId='" + getEmailMessageId() + "'" +
            ", extractOcrDataJson='" + getExtractOcrDataJson() + "'" +
            ", searchId='" + getSearchId() + "'" +
            ", clientEmailAddress='" + getClientEmailAddress() + "'" +
            ", attachmentfileName='" + getAttachmentfileName() + "'" +
            ", inputTemplate=" + getInputTemplateId() +
            ", inputTemplate='" + getInputTemplateTemplateName() + "'" +
            ", transaction=" + getTransactionId() +
            "}";
    }
}
