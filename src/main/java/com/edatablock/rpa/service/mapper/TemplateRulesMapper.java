package com.edatablock.rpa.service.mapper;

import com.edatablock.rpa.domain.*;
import com.edatablock.rpa.service.dto.TemplateRulesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TemplateRules and its DTO TemplateRulesDTO.
 */
@Mapper(componentModel = "spring", uses = {InputTemplateMapper.class})
public interface TemplateRulesMapper extends EntityMapper<TemplateRulesDTO, TemplateRules> {

    @Mapping(source = "inputTemplate.id", target = "inputTemplateId")
    @Mapping(source = "inputTemplate.templateName", target = "inputTemplateTemplateName")
    TemplateRulesDTO toDto(TemplateRules templateRules);

    @Mapping(source = "inputTemplateId", target = "inputTemplate")
    TemplateRules toEntity(TemplateRulesDTO templateRulesDTO);

    default TemplateRules fromId(Long id) {
        if (id == null) {
            return null;
        }
        TemplateRules templateRules = new TemplateRules();
        templateRules.setId(id);
        return templateRules;
    }
}
