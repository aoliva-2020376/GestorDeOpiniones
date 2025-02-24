import { Router } from "express"
import {
    updateUser,
    updateUserPassword,
    deleteUser,
} from "./usuarios.controller.js"
import { 
    updateUserValidators, 
    updatePasswordValidator 
} from "../../middlewares/validators.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.put(
    "/:id",
        [
            validateJwt,
            updateUserValidators
        ],
    updateUser
)

api.put(
    "/updPassword/:id",
        [
            validateJwt,
            updatePasswordValidator
        ],
    updateUserPassword
)

api.put(
    "/desactivar/:id",
        [
            validateJwt
        ],
    deleteUser
)

export default api