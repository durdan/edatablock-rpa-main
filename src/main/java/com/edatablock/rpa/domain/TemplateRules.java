package com.edatablock.rpa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TemplateRules.
 */
@Entity
@Table(name = "template_rules")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TemplateRules implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rule_sequence")
    private Integer ruleSequence;

    @Column(name = "lookup_place")
    private String lookupPlace;

    @Column(name = "operator")
    private String operator;

    @Column(name = "jhi_value")
    private String value;

    @Column(name = "join_field")
    private String joinField;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private InputTemplate inputTemplate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRuleSequence() {
        return ruleSequence;
    }

    public TemplateRules ruleSequence(Integer ruleSequence) {
        this.ruleSequence = ruleSequence;
        return this;
    }

    public void setRuleSequence(Integer ruleSequence) {
        this.ruleSequence = ruleSequence;
    }

    public String getLookupPlace() {
        return lookupPlace;
    }

    public TemplateRules lookupPlace(String lookupPlace) {
        this.lookupPlace = lookupPlace;
        return this;
    }

    public void setLookupPlace(String lookupPlace) {
        this.lookupPlace = lookupPlace;
    }

    public String getOperator() {
        return operator;
    }

    public TemplateRules operator(String operator) {
        this.operator = operator;
        return this;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getValue() {
        return value;
    }

    public TemplateRules value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getJoinField() {
        return joinField;
    }

    public TemplateRules joinField(String joinField) {
        this.joinField = joinField;
        return this;
    }

    public void setJoinField(String joinField) {
        this.joinField = joinField;
    }

    public String getDescription() {
        return description;
    }

    public TemplateRules description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public InputTemplate getInputTemplate() {
        return inputTemplate;
    }

    public TemplateRules inputTemplate(InputTemplate inputTemplate) {
        this.inputTemplate = inputTemplate;
        return this;
    }

    public void setInputTemplate(InputTemplate inputTemplate) {
        this.inputTemplate = inputTemplate;
    }

    public Client getClient() {
        return client;
    }

    public TemplateRules client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
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
        TemplateRules templateRules = (TemplateRules) o;
        if (templateRules.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), templateRules.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TemplateRules{" +
            "id=" + getId() +
            ", ruleSequence=" + getRuleSequence() +
            ", lookupPlace='" + getLookupPlace() + "'" +
            ", operator='" + getOperator() + "'" +
            ", value='" + getValue() + "'" +
            ", joinField='" + getJoinField() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
