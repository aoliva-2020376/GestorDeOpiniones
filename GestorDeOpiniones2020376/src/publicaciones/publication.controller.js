import Publication from "./publication.model.js"
import Category from "../categorias/category.model.js"

export const getPublications = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        
        const publications = await Publication.find()
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('category', 'name description')
        
        if (publications.length === 0) {
            return res.status(400).send(
                { 
                    success: false, 
                    message: 'No publications found' 
                }
            )
        }

        return res.status(200).send(
            { 
                success: true, 
                message: 'Publications found',
                publications 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'Error fetching publications', 
                err 
            }
        )
    }
}

export const getPublicationById = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id)
            .populate('category', 'name description')

        if (!publication) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Publication not found' 
                }
            )
        }
        return res.status(200).send(
            { 
                success: true, 
                publication 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'Error retrieving publication', 
                err 
            }
        )
    }
}

export const createPublication = async (req, res) => {
    try {
        const { title, mainText, category } = req.body
        
        const existingCategory = await Category.findById(category)
        if (!existingCategory) {
            return res.status(400).send(
                { 
                    success: false, 
                    message: 'Category not found' 
                }
            )
        }

        const newPublication = new Publication({ title, mainText, category })
        await newPublication.save()

        return res.status(201).send(
            { 
                success: true, 
                message: 'Publication created successfully', 
                newPublication 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'Error creating publication', 
                err 
            }
        )
    }
}

export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params
        const { title, mainText, category } = req.body

        const publication = await Publication.findById(id)

        if (!publication) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Publication not found' 
                }
            )
        }

        const updatedPublication = await Publication.findByIdAndUpdate(id, { title, mainText, category }, { new: true })

        return res.send(
            { 
                success: true, 
                message: 'Publication updated successfully', 
                updatedPublication 
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'Error updating publication', 
                err 
            }
        )
    }
}

export const deletePublication = async (req, res) => {
    try {
        const deletedPublication = await Publication.findByIdAndDelete(req.params.id)
        if (!deletedPublication) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'Publication not found' 
                }
            )
        }
        return res.status(200).send(
            { 
                success: true, 
                message: 'Publication deleted successfully' 
            }   
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'Error deleting publication', 
                err 
            }
        )
    }
}
