package com.edatablock.rpa.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TemplateRules entity.
 */
public class TemplateRulesDTO implements Serializable {

    private Long id;

    private Integer ruleSequence;

    private String lookupPlace;

    private String operator;

    private String value;

    private String joinField;

    private String description;

    private Long inputTemplateId;

    private String inputTemplateTemplateName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRuleSequence() {
        return ruleSequence;
    }

    public void setRuleSequence(Integer ruleSequence) {
        this.ruleSequence = ruleSequence;
    }

    public String getLookupPlace() {
        return lookupPlace;
    }

    public void setLookupPlace(String lookupPlace) {
        this.lookupPlace = lookupPlace;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getJoinField() {
        return joinField;
    }

    public void setJoinField(String joinField) {
        this.joinField = joinField;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TemplateRulesDTO templateRulesDTO = (TemplateRulesDTO) o;
        if (templateRulesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), templateRulesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TemplateRulesDTO{" +
            "id=" + getId() +
            ", ruleSequence=" + getRuleSequence() +
            ", lookupPlace='" + getLookupPlace() + "'" +
            ", operator='" + getOperator() + "'" +
            ", value='" + getValue() + "'" +
            ", joinField='" + getJoinField() + "'" +
            ", description='" + getDescription() + "'" +
            ", inputTemplate=" + getInputTemplateId() +
            ", inputTemplate='" + getInputTemplateTemplateName() + "'" +
            "}";
    }
}
