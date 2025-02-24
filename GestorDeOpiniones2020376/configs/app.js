'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import { limiter } from '../middlewares/rate.limit.js'


import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/usuarios/usuarios.routes.js'
import categoryRoutes from '../src/categorias/category.routes.js'
import publicationRoutes from '../src/publicaciones/publication.routes.js'
import commentRoutes from '../src/comentario/comment.routes.js'

dotenv.config()

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app) => {
    app.use('/v1/auth', authRoutes)
    app.use('/v1/users', userRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/publication', publicationRoutes)
    app.use('/v1/comments', commentRoutes)
}

export const initServer = () => {
    const app = express();
    try {
        configs(app);
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Server init failed', err);
        process.exit(1);
    }
};
