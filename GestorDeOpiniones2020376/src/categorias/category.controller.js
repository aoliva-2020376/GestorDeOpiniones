'use strict'

import Category from "./category.model.js"

export const getCategories = async (req, res) =>{
    try {
        const {limit = 20, skip = 0 } = req.query
        
        const categories = await Category.find()
            .skip(Number(skip))
            .limit(Number(limit))
        
        if (categories.length ===0) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'No categories found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Cagories found:',
                categories
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error fetching categories',
                err
            }
        )
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }
        return res.status(200).send(
            {
                success: true,
                category
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error retrieving category',
                err
            }
        )
    }
}

export const createCategory = async (req, res) => {
    try {
        
        const { name, description } = req.body
        const newCategory = new Category({ name, description })
        await newCategory.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Category created successfully',
                newCategory
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Errore creating category',
                err
            }
        )
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true })

        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                updatedCategory
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error updating category',
                err
            }
        )
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id)
        if (!deletedCategory) {
            return res.status(404).send(
                {
                success: false,
                message: 'Category not found'
                }
            )
        }
        return res.status(200).send(
            {
                success: true,
                message: 'Category deleted successfully'
            }   
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'Error deleting category',
                err
            }
        )
    }
}

const agregarCategoriaPorDefecto = async () => {
    try {
        const categoryCount = await Category.countDocuments()
        if (categoryCount === 0) {
            const defaultCategory = new Category(
                {
                    name: 'General',
                    description: 'Default category'
                }
            )
            await defaultCategory.save()
            console.log('Categoria General creada')
        }
    } catch (err) {
        console.error(err)
    }
}

agregarCategoriaPorDefecto()