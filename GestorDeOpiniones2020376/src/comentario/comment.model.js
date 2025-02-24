'use strict'

import { Schema, model } from 'mongoose'

const commentSchema = Schema({
    comentario: {
        type: String,
        required: true
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default model('Comment',commentSchema)