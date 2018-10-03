package com.edatablock.rpa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ClientDataOcr.
 */
@Entity
@Table(name = "client_data_ocr")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClientDataOcr implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email_message_id")
    private String emailMessageId;

    @Column(name = "extract_ocr_data_json")
    private String extractOcrDataJson;

    @Column(name = "search_id")
    private String searchId;

    @Column(name = "client_email_address")
    private String clientEmailAddress;

    @Column(name = "attachmentfile_name")
    private String attachmentfileName;

    @OneToOne
    @JoinColumn(unique = true)
    private InputTemplate inputTemplate;

    @ManyToOne
    @JsonIgnoreProperties("clientDataOcrs")
    private Transaction transaction;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailMessageId() {
        return emailMessageId;
    }

    public ClientDataOcr emailMessageId(String emailMessageId) {
        this.emailMessageId = emailMessageId;
        return this;
    }

    public void setEmailMessageId(String emailMessageId) {
        this.emailMessageId = emailMessageId;
    }

    public String getExtractOcrDataJson() {
        return extractOcrDataJson;
    }

    public ClientDataOcr extractOcrDataJson(String extractOcrDataJson) {
        this.extractOcrDataJson = extractOcrDataJson;
        return this;
    }

    public void setExtractOcrDataJson(String extractOcrDataJson) {
        this.extractOcrDataJson = extractOcrDataJson;
    }

    public String getSearchId() {
        return searchId;
    }

    public ClientDataOcr searchId(String searchId) {
        this.searchId = searchId;
        return this;
    }

    public void setSearchId(String searchId) {
        this.searchId = searchId;
    }

    public String getClientEmailAddress() {
        return clientEmailAddress;
    }

    public ClientDataOcr clientEmailAddress(String clientEmailAddress) {
        this.clientEmailAddress = clientEmailAddress;
        return this;
    }

    public void setClientEmailAddress(String clientEmailAddress) {
        this.clientEmailAddress = clientEmailAddress;
    }

    public String getAttachmentfileName() {
        return attachmentfileName;
    }

    public ClientDataOcr attachmentfileName(String attachmentfileName) {
        this.attachmentfileName = attachmentfileName;
        return this;
    }

    public void setAttachmentfileName(String attachmentfileName) {
        this.attachmentfileName = attachmentfileName;
    }

    public InputTemplate getInputTemplate() {
        return inputTemplate;
    }

    public ClientDataOcr inputTemplate(InputTemplate inputTemplate) {
        this.inputTemplate = inputTemplate;
        return this;
    }

    public void setInputTemplate(InputTemplate inputTemplate) {
        this.inputTemplate = inputTemplate;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public ClientDataOcr transaction(Transaction transaction) {
        this.transaction = transaction;
        return this;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
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
        ClientDataOcr clientDataOcr = (ClientDataOcr) o;
        if (clientDataOcr.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clientDataOcr.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClientDataOcr{" +
            "id=" + getId() +
            ", emailMessageId='" + getEmailMessageId() + "'" +
            ", extractOcrDataJson='" + getExtractOcrDataJson() + "'" +
            ", searchId='" + getSearchId() + "'" +
            ", clientEmailAddress='" + getClientEmailAddress() + "'" +
            ", attachmentfileName='" + getAttachmentfileName() + "'" +
            "}";
    }
}
