import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js"
import { existEmail, existUsername } from "../utils/db.validators.js";


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need at least 8 characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const updateUserValidators = [
    body('username')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, { req }) => existUsername(username, req.user)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, { req }) => existEmail(email, req.user)),
    validateErrors
]

// Validaciones para actualizar contraseña
export const updatePasswordValidator = [
    body('currentPassword', 'Current password is required').notEmpty(),
    body('newPassword', 'New password is required')
        .notEmpty()
        .isStrongPassword()
        .withMessage('New password must be strong')
        .isLength({ min: 8 })
        .withMessage('New password needs at least 8 characters'),
    validateErrors
];