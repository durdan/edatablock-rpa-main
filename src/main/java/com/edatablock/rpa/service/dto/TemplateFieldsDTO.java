package com.edatablock.rpa.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the TemplateFields entity.
 */
public class TemplateFieldsDTO implements Serializable {

    private Long id;

    @NotNull
    private String fieldName;

    @NotNull
    private Double fieldZoneMinX;

    @NotNull
    private Double fieldZoneMinY;

    @NotNull
    private Double fieldZoneMaxX;

    @NotNull
    private Double fieldZoneMaxY;

    private Double width;

    private Double height;

    private Integer sequence;

    private Integer isTemplateIdentifier;

    private Integer isLabel;

    private Integer pageNumebr;

    private Integer fieldValidationRequire;

    private String fieldValidationRule;

    private Long inputTemplateId;

    private String inputTemplateTemplateName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Double getFieldZoneMinX() {
        return fieldZoneMinX;
    }

    public void setFieldZoneMinX(Double fieldZoneMinX) {
        this.fieldZoneMinX = fieldZoneMinX;
    }

    public Double getFieldZoneMinY() {
        return fieldZoneMinY;
    }

    public void setFieldZoneMinY(Double fieldZoneMinY) {
        this.fieldZoneMinY = fieldZoneMinY;
    }

    public Double getFieldZoneMaxX() {
        return fieldZoneMaxX;
    }

    public void setFieldZoneMaxX(Double fieldZoneMaxX) {
        this.fieldZoneMaxX = fieldZoneMaxX;
    }

    public Double getFieldZoneMaxY() {
        return fieldZoneMaxY;
    }

    public void setFieldZoneMaxY(Double fieldZoneMaxY) {
        this.fieldZoneMaxY = fieldZoneMaxY;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Integer getIsTemplateIdentifier() {
        return isTemplateIdentifier;
    }

    public void setIsTemplateIdentifier(Integer isTemplateIdentifier) {
        this.isTemplateIdentifier = isTemplateIdentifier;
    }

    public Integer getIsLabel() {
        return isLabel;
    }

    public void setIsLabel(Integer isLabel) {
        this.isLabel = isLabel;
    }

    public Integer getPageNumebr() {
        return pageNumebr;
    }

    public void setPageNumebr(Integer pageNumebr) {
        this.pageNumebr = pageNumebr;
    }

    public Integer getFieldValidationRequire() {
        return fieldValidationRequire;
    }

    public void setFieldValidationRequire(Integer fieldValidationRequire) {
        this.fieldValidationRequire = fieldValidationRequire;
    }

    public String getFieldValidationRule() {
        return fieldValidationRule;
    }

    public void setFieldValidationRule(String fieldValidationRule) {
        this.fieldValidationRule = fieldValidationRule;
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

        TemplateFieldsDTO templateFieldsDTO = (TemplateFieldsDTO) o;
        if (templateFieldsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), templateFieldsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TemplateFieldsDTO{" +
            "id=" + getId() +
            ", fieldName='" + getFieldName() + "'" +
            ", fieldZoneMinX=" + getFieldZoneMinX() +
            ", fieldZoneMinY=" + getFieldZoneMinY() +
            ", fieldZoneMaxX=" + getFieldZoneMaxX() +
            ", fieldZoneMaxY=" + getFieldZoneMaxY() +
            ", width=" + getWidth() +
            ", height=" + getHeight() +
            ", sequence=" + getSequence() +
            ", isTemplateIdentifier=" + getIsTemplateIdentifier() +
            ", isLabel=" + getIsLabel() +
            ", pageNumebr=" + getPageNumebr() +
            ", fieldValidationRequire=" + getFieldValidationRequire() +
            ", fieldValidationRule='" + getFieldValidationRule() + "'" +
            ", inputTemplate=" + getInputTemplateId() +
            ", inputTemplate='" + getInputTemplateTemplateName() + "'" +
            "}";
    }
}
