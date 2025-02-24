import { Router } from "express"
import { 
    getComments, 
    getCommentById, 
    createComment, 
    updateComment, 
    deleteComment 
} from "./comment.controller.js"
import { 
    validateJwt 
} from "../../middlewares/validate.jwt.js"

const api = Router()

api.get('/', 
    [
        validateJwt
    ], 
    getComments
)

api.get('/:id', 
    [
        validateJwt
    ], 
    getCommentById
)

api.post('/create', 
    [
        validateJwt
    ], 
    createComment
)

api.put('/update/:id', 
    [
        validateJwt
    ], 
    updateComment
)

api.delete('/delete/:id', 
    [
        validateJwt
    ], 
    deleteComment
)

export default api
