import Comment from "./comment.model.js"
import Publication from "../publicaciones/publication.model.js"
import User from "../usuarios/usuarios.model.js"

export const getComments = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query

        const comments = await Comment.find()
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('publicacion', 'title')
            .populate('user', 'username') 

        if (comments.length === 0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'No comments found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Comments found',
                comments
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error fetching comments',
                err
            }
        )
    }
}

export const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('publicacion', 'title')
            .populate('user', 'name username email')

        if (!comment) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                comment
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving comment',
                err
            }
        )
    }
}

export const createComment = async (req, res) => {
    try {
        const { publicacion, comentario, userId } = req.body

        const publication = await Publication.findById(publicacion)
        if (!publication) {
            return res.status(400).send({
                success: false,
                message: 'Publication not found'
            })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found'
            })
        }

        const newComment = new Comment({ 
            publicacion,
            user: userId,
            comentario: comentario
        })
        await newComment.save()

        return res.status(201).send({
            success: true,
            message: 'Comment created successfully',
            newComment
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'Error creating comment',
            err
        })
    }
}


export const updateComment = async (req, res) => {
    try {
        const { id } = req.params
        const { comentario } = req.body
        const comment = await Comment.findById(id)
        const Iduser = req.user.uid
        const existingComment = await Comment.findById(id)
        if (existingComment.author != Iduser) {
            return res.status(403).send(
                {
                    success: false,
                    message: "SOlo puedes editar tu comentario",
                }
            )
        }
        if (!comment) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        comment.comentario = comentario
        await comment.save()

        return res.send(
            {
                success: true,
                message: 'Comment updated successfully',
                updatedComment: comment
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error updating comment',
                err
            }
        )
    }
}

export const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id)
        if (!deletedComment) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Comment not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Comment deleted successfully'
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error deleting comment',
                err
            }
        )
    }
}
