package com.edatablock.rpa.repository;

import com.edatablock.rpa.domain.TemplateRules;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TemplateRules entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TemplateRulesRepository extends JpaRepository<TemplateRules, Long> {

}
