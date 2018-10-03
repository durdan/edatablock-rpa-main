package com.edatablock.rpa.repository;

import com.edatablock.rpa.domain.ErrorInProcessing;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ErrorInProcessing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ErrorInProcessingRepository extends JpaRepository<ErrorInProcessing, Long> {

}
