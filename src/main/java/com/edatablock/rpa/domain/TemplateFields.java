package com.edatablock.rpa.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A TemplateFields.
 */
@Entity
@Table(name = "template_fields")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TemplateFields implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "field_name", nullable = false)
    private String fieldName;

    @NotNull
    @Column(name = "field_zone_min_x", nullable = false)
    private Double fieldZoneMinX;

    @NotNull
    @Column(name = "field_zone_min_y", nullable = false)
    private Double fieldZoneMinY;

    @NotNull
    @Column(name = "field_zone_max_x", nullable = false)
    private Double fieldZoneMaxX;

    @NotNull
    @Column(name = "field_zone_max_y", nullable = false)
    private Double fieldZoneMaxY;

    @Column(name = "width")
    private Double width;

    @Column(name = "height")
    private Double height;

    @Column(name = "jhi_sequence")
    private Integer sequence;

    @Column(name = "is_template_identifier")
    private Integer isTemplateIdentifier;

    @Column(name = "is_label")
    private Integer isLabel;

    @Column(name = "page_numebr")
    private Integer pageNumebr;

    @Column(name = "field_validation_require")
    private Integer fieldValidationRequire;

    @Column(name = "field_validation_rule")
    private String fieldValidationRule;

    @ManyToOne
    @JsonIgnoreProperties("")
    private InputTemplate inputTemplate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFieldName() {
        return fieldName;
    }

    public TemplateFields fieldName(String fieldName) {
        this.fieldName = fieldName;
        return this;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Double getFieldZoneMinX() {
        return fieldZoneMinX;
    }

    public TemplateFields fieldZoneMinX(Double fieldZoneMinX) {
        this.fieldZoneMinX = fieldZoneMinX;
        return this;
    }

    public void setFieldZoneMinX(Double fieldZoneMinX) {
        this.fieldZoneMinX = fieldZoneMinX;
    }

    public Double getFieldZoneMinY() {
        return fieldZoneMinY;
    }

    public TemplateFields fieldZoneMinY(Double fieldZoneMinY) {
        this.fieldZoneMinY = fieldZoneMinY;
        return this;
    }

    public void setFieldZoneMinY(Double fieldZoneMinY) {
        this.fieldZoneMinY = fieldZoneMinY;
    }

    public Double getFieldZoneMaxX() {
        return fieldZoneMaxX;
    }

    public TemplateFields fieldZoneMaxX(Double fieldZoneMaxX) {
        this.fieldZoneMaxX = fieldZoneMaxX;
        return this;
    }

    public void setFieldZoneMaxX(Double fieldZoneMaxX) {
        this.fieldZoneMaxX = fieldZoneMaxX;
    }

    public Double getFieldZoneMaxY() {
        return fieldZoneMaxY;
    }

    public TemplateFields fieldZoneMaxY(Double fieldZoneMaxY) {
        this.fieldZoneMaxY = fieldZoneMaxY;
        return this;
    }

    public void setFieldZoneMaxY(Double fieldZoneMaxY) {
        this.fieldZoneMaxY = fieldZoneMaxY;
    }

    public Double getWidth() {
        return width;
    }

    public TemplateFields width(Double width) {
        this.width = width;
        return this;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public TemplateFields height(Double height) {
        this.height = height;
        return this;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Integer getSequence() {
        return sequence;
    }

    public TemplateFields sequence(Integer sequence) {
        this.sequence = sequence;
        return this;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Integer getIsTemplateIdentifier() {
        return isTemplateIdentifier;
    }

    public TemplateFields isTemplateIdentifier(Integer isTemplateIdentifier) {
        this.isTemplateIdentifier = isTemplateIdentifier;
        return this;
    }

    public void setIsTemplateIdentifier(Integer isTemplateIdentifier) {
        this.isTemplateIdentifier = isTemplateIdentifier;
    }

    public Integer getIsLabel() {
        return isLabel;
    }

    public TemplateFields isLabel(Integer isLabel) {
        this.isLabel = isLabel;
        return this;
    }

    public void setIsLabel(Integer isLabel) {
        this.isLabel = isLabel;
    }

    public Integer getPageNumebr() {
        return pageNumebr;
    }

    public TemplateFields pageNumebr(Integer pageNumebr) {
        this.pageNumebr = pageNumebr;
        return this;
    }

    public void setPageNumebr(Integer pageNumebr) {
        this.pageNumebr = pageNumebr;
    }

    public Integer getFieldValidationRequire() {
        return fieldValidationRequire;
    }

    public TemplateFields fieldValidationRequire(Integer fieldValidationRequire) {
        this.fieldValidationRequire = fieldValidationRequire;
        return this;
    }

    public void setFieldValidationRequire(Integer fieldValidationRequire) {
        this.fieldValidationRequire = fieldValidationRequire;
    }

    public String getFieldValidationRule() {
        return fieldValidationRule;
    }

    public TemplateFields fieldValidationRule(String fieldValidationRule) {
        this.fieldValidationRule = fieldValidationRule;
        return this;
    }

    public void setFieldValidationRule(String fieldValidationRule) {
        this.fieldValidationRule = fieldValidationRule;
    }

    public InputTemplate getInputTemplate() {
        return inputTemplate;
    }

    public TemplateFields inputTemplate(InputTemplate inputTemplate) {
        this.inputTemplate = inputTemplate;
        return this;
    }

    public void setInputTemplate(InputTemplate inputTemplate) {
        this.inputTemplate = inputTemplate;
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
        TemplateFields templateFields = (TemplateFields) o;
        if (templateFields.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), templateFields.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TemplateFields{" +
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
            "}";
    }
}
