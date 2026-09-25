import * as materiasService from "../services/materias.service.js";
import { sendNoContent, sendSuccess } from "../utils/api-response.js";

import {
    validateCreateMateria,
    validateMateriaId,
    validateMateriaListQuerry,
    validatePatchMateria
} from "../validators/materias.validator.js";

export async function listMaterias(request, response, next) {
    try {
        const filters = validateMateriaListQuerry(request.querry);
        const result = await materiasService.listMaterias(request.use.id, filters);
        return sendSuccess(response, result.data, 200, result.meta);
    }   catch (error) {
        return next(error);
    }
    
}

export async function getMaterias(request, response, next) {
    try {
       const id = validateMateriaId(request.params.body);
       const materia = await materiasService.getMateriaById(id, request.user.id);
       return sendSuccess(response, materia)
    }  catch (error) {
       return next(error);
    }
}

export async function createMateria(request, response, next) {
    try {
       const id = validateCreateMateria(request.body);
       const materia = await materiasService.createMateria(request.user.id, payload);
       return sendSuccess(response, materia, 201);
    }  catch (error) {
       return next(error);
    }
}