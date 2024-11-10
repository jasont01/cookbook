import express from 'express'
import userRoutes from './userRoutes.js'
import recipeRoutes from './recipe.js'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/recipe', recipeRoutes)

export default router
