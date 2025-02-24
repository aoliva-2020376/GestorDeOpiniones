import { Router } from "express";
import {
    isAdmin,
    validateJwt
} from "../../middlewares/validate.jwt.js";
import { 
    createCategory, 
    deleteCategory,
    getCategories, 
    getCategoryById, 
    updateCategory 
} from "./category.controller.js";

const api = Router()

//CLIENT con token
api.get('/',
    [
        validateJwt
    ],
    getCategories
)

api.get('/:id',
    [
        validateJwt
    ],
    getCategoryById
)

//ADMIN 
api.post('/create',
    [
        validateJwt,
        isAdmin
    ],
    createCategory
)

api.put('/update/:id',
    [
        validateJwt,
        isAdmin
    ],
    updateCategory
)

api.delete('/delete/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteCategory
)

export default api