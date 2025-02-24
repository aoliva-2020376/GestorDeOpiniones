import { Router } from "express";
import { 
    createPublication, 
    deletePublication, 
    getPublications, 
    getPublicationById, 
    updatePublication 
} from "./publication.controller.js";
import { 
    validateJwt 
} from "../../middlewares/validate.jwt.js";


const api = Router()


api.get('/', 
    [
        validateJwt
    ], 
    getPublications
)

api.get('/:id', 
    [
        validateJwt
    ], 
    getPublicationById
)


api.post('/create', 
    [
        validateJwt
    ], 
    createPublication
)

api.put('/update/:id', 
    [
        validateJwt
    ], 
    updatePublication
)

api.delete('/delete/:id', 
    [
        validateJwt
    ], 
    deletePublication
)

export default api;
