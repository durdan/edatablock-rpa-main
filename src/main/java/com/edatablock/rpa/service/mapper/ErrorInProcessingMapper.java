package com.edatablock.rpa.service.mapper;

import com.edatablock.rpa.domain.*;
import com.edatablock.rpa.service.dto.ErrorInProcessingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ErrorInProcessing and its DTO ErrorInProcessingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ErrorInProcessingMapper extends EntityMapper<ErrorInProcessingDTO, ErrorInProcessing> {



    default ErrorInProcessing fromId(Long id) {
        if (id == null) {
            return null;
        }
        ErrorInProcessing errorInProcessing = new ErrorInProcessing();
        errorInProcessing.setId(id);
        return errorInProcessing;
    }
}
