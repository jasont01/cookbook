import express from 'express'
import { createRecipe, getAllRecipes } from '../controllers/recipeController.js'
import { verifyAccessToken } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * @route /api/recipe
 */
router.post('/', verifyAccessToken, createRecipe)
router.get('/', verifyAccessToken, getAllRecipes)

export default router
